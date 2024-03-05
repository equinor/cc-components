import {
  IndexSet,
  BoundingBoxClipper,
  CogniteCadModel,
  InvertedNodeCollection,
  NodeAppearance,
  TreeIndexNodeCollection,
} from '@cognite/reveal';
import CameraControls, {
  AabbModel,
  AssetMetadataSimpleDto,
  CameraControlsExtended,
  CancelToken,
  Echo3dViewer,
  HierarchyClient,
  HierarchyNodeModel,
  getTagNoRefNoAndAabbByNodeId,
  SelectedNodeInformation,
  combineHierarchyAabbs,
  getNumericRange,
} from '@equinor/echo-3d-viewer';

import { get3dPositionFromAabbMinMaxValues } from '@equinor/echo-3d-viewer/dist/src/utils/calculationUtils';

import { ViewerNodeSelection } from '../types/viewerNodeSelection';

import * as THREE from 'three';
import { Box3, Color, Vector3 } from 'three';
import { useModelContext } from '../providers/modelProvider';

CameraControls.install({ THREE });

export interface TagColor {
  tag: string;
  color: string | Color;
}

export interface SelectNodesByTagOptions {
  fitToSelection?: boolean;
  appearance?: NodeAppearance;
  duration?: number | undefined;
  radiusFactor?: number | undefined;
  invertedAppearance?: NodeAppearance;
  signal?: AbortSignal;
}

export const useSelectionControls = () => {
  const { modelMeta, hierarchyClient, viewer, model } = useModelContext();

  const findNodesByTags = async (tags: string[], signal?: AbortSignal) => {
    const request = await hierarchyClient.findNodesByTagList(
      modelMeta.hierarchyId,
      tags,
      signal
    );
    return request.results;
  };

  const getNodeFromTreeId = async (
    treeIndex: number,
    ct: CancelToken = CancelToken.none
  ) => {
    return await getTagNoRefNoAndAabbByNodeId(treeIndex, modelMeta.hierarchyId, ct);
  };

  const selectNodesByTags = async (tags: string[], options?: SelectNodesByTagOptions) => {
    const nodes = await findNodesByTags(tags, options?.signal);
    const nodeCollection = getNodeCollectionFromHierarchyNodeModel(nodes);

    const appearance = resetStyleToNodeAppearance(options?.appearance);

    model.assignStyledNodeCollection(
      nodeCollection,
      options?.appearance || {
        color: new Color(177 / 255, 140 / 255, 255 / 255),
        renderInFront: true,
      }
    );

    assignStyletToInvertedNodeCollection(nodeCollection, appearance);

    if (options?.fitToSelection)
      fitCameraToNodeSelection(nodes, options?.duration || 0, options?.radiusFactor);

    return nodes;
  };

  const assignColorByTagColor = async (
    tagColors: TagColor[],
    options?: SelectNodesByTagOptions
  ) => {
    const nodes = await findNodesByTags(tagColors.map((tagColor) => tagColor.tag));
    assignColorToNodesByTagColor(nodes, tagColors);

    if (options?.fitToSelection) {
      fitCameraToNodeSelection(nodes, options?.duration || 0, options?.radiusFactor);
    }

    return nodes;
  };

  const assignColorToNodesByTagColor = async (
    nodes: HierarchyNodeModel[],
    tagColors: TagColor[],
    appearance: NodeAppearance = {}
  ) => {
    const nodeCollectionsMap = getNodeCollectionsMap(nodes, tagColors);

    Object.values(nodeCollectionsMap).forEach((collection) => {
      const nodeCollection = getNodeCollectionFromHierarchyNodeModel(collection.nodes);

      model.assignStyledNodeCollection(nodeCollection, {
        color: collection.color,
        renderInFront: true,
      });
    });

    assignStyletToInvertedNodeCollection(
      getNodeCollectionFromHierarchyNodeModel(nodes),
      appearance
    );
  };

  const resetStyleToNodeAppearance = (appearance?: NodeAppearance) => {
    const newAppearance = appearance || model.getDefaultNodeAppearance();
    model.styledNodeCollections.forEach((nodeCollection) =>
      model.assignStyledNodeCollection(nodeCollection.nodeCollection, newAppearance)
    );

    return newAppearance;
  };

  const showNodesNotInSelection = async (nodes: HierarchyNodeModel[], show: boolean) => {
    const newAppearance = {
      visible: show,
    };

    assignStyletToInvertedNodeCollection(
      getNodeCollectionFromHierarchyNodeModel(nodes),
      newAppearance
    );
  };

  const getNodeCollectionsMap = (nodes: HierarchyNodeModel[], tagColors: TagColor[]) => {
    return tagColors.reduce((nodeCollectionsMap, tagColor) => {
      if (typeof tagColor.color === 'string') {
        tagColor.color = new Color(tagColor.color);
      }
      const key = tagColor.color.getHexString();

      if (nodeCollectionsMap[key]) {
        nodeCollectionsMap[key].nodes.push(
          ...nodes.filter((node) => node.tag === tagColor.tag)
        );
      } else {
        nodeCollectionsMap[key] = {
          color: tagColor.color,
          nodes: nodes.filter((node) => node.tag === tagColor.tag),
        };
      }

      return nodeCollectionsMap;
    }, {} as Record<string, { color: Color; nodes: HierarchyNodeModel[] }>);
  };

  const assignStyletToInvertedNodeCollection = (
    nodeCollection: TreeIndexNodeCollection,
    appearance: NodeAppearance
  ) => {
    const unassignedNodes = new InvertedNodeCollection(model, nodeCollection);
    model.assignStyledNodeCollection(unassignedNodes, appearance);
  };

  const fitCameraToNodeSelection = (
    nodes: HierarchyNodeModel[],
    duration?: number | undefined,
    radiusFactor?: number | undefined
  ) => {
    const box = getBoxFromNodes(nodes);
    if (box) fitCameraToBox3(box, duration, radiusFactor);
  };

  const fitCameraToBox3 = (
    box: Box3,
    duration?: number | undefined,
    radiusFactor?: number | undefined
  ) => {
    viewer?.fitCameraToBoundingBox(box, duration, radiusFactor);
  };

  const clipModelByNodes = (
    nodes: HierarchyNodeModel[],
    isClipped: boolean,
    padding?: number
  ) => {
    const aabb = getCombinedAAbbsFromNodes(nodes);
    aabb && clipModelByAabbModel(aabb, isClipped, padding);
  };

  const clipModelByAabbModel = (
    aabb: AabbModel,
    isClipped: boolean,
    padding?: number
  ) => {
    const boundingBox = getBoundingBoxFormAabbModel(aabb, padding);
    if (isClipped) {
      const clipper = new BoundingBoxClipper(boundingBox);
      viewer.setGlobalClippingPlanes(clipper.clippingPlanes);
    } else {
      viewer.setGlobalClippingPlanes([]);
    }
  };

  const cameraObitTarget = (target: Vector3) => {
    const camera = viewer.cameraManager.getCamera();
    const cameraManager = viewer.getCameraManager();

    cameraManager.initializeOrbitControls(camera.position, target);
  };

  const cameraFirstPerson = () => {
    const camera = viewer.cameraManager.getCamera();

    const cameraManager = viewer.getCameraManager();

    const controls = cameraManager.getControls();
    if (controls instanceof CameraControlsExtended) {
      const target = controls.getTarget(new Vector3());

      cameraManager.initializeFirstPersonControlsUsingTarget(camera.position, target);
    }
  };

  const getViewerNodeSelection = (nodes: HierarchyNodeModel[]): ViewerNodeSelection[] => {
    return nodes
      .filter((nodeResult) => nodeResult.aabb && nodeResult.tag)
      .map((nodeResult) => {
        const { min, max } = nodeResult.aabb!;

        const boundingBox = new THREE.Box3(
          new THREE.Vector3(min.x, min.z, -max.y),
          new THREE.Vector3(max.x, max.z, -min.y)
        );

        return {
          position: get3dPositionFromAabbMinMaxValues(nodeResult.aabb!),
          tagNo: nodeResult.tag!,
          aabb: nodeResult.aabb!,
          boundingBox,
        };
      });
  };

  const getNodeTagInfoFromHierarchyNodeModel = (
    nodes: HierarchyNodeModel[]
  ): SelectedNodeInformation[] => {
    return nodes.map((node) => {
      return {
        id: node.id,
        endId: node.endId,
        e3dTagNo: node.tag,
        discipline: node.discipline,
        system: node.system,
        parentId: node.parentId,
        referenceNo: node.pdmsData ? node.pdmsData.RefNo : undefined,
        nodeAabb: node.aabb,
        tag: node.tag,
        point: node.aabb ? get3dPositionFromAabbMinMaxValues(node.aabb) : undefined,
      };
    });
  };

  const getNodeCollectionFromHierarchyNodeModel = (
    nodes: HierarchyNodeModel[]
  ): TreeIndexNodeCollection => {
    const indices = new IndexSet();
    const numericRanges = nodes.filter((x) => x.endId).map((x) => getNumericRange(x));
    numericRanges.forEach((range) => indices.addRange(range));
    return new TreeIndexNodeCollection(indices);
  };

  const getCombinedAAbbsFromNodes = (nodes: HierarchyNodeModel[]): AabbModel | null => {
    const aabbs = nodes.reduce((allAabbs: AabbModel[], highlightedNode) => {
      if (highlightedNode.aabb) allAabbs.push(highlightedNode.aabb);
      return allAabbs;
    }, []);

    return combineHierarchyAabbs(aabbs);
  };

  const getCenterFromNodes = (nodes?: HierarchyNodeModel[]) => {
    if (!nodes) return new THREE.Vector3(0, 0, 0);

    const aabb = getCombinedAAbbsFromNodes(nodes);
    return aabb ? get3dPositionFromAabbMinMaxValues(aabb) : new THREE.Vector3(0, 0, 0);
  };

  const getBoxFromNodes = (nodes: HierarchyNodeModel[]): THREE.Box3 | undefined => {
    const aabb = getCombinedAAbbsFromNodes(nodes);

    if (!aabb) return;

    return getBoundingBoxFormAabbModel(aabb);
  };

  const getBoundingBoxFormAabbModel = (aabb: AabbModel, padding = 1) => {
    const { min, max } = aabb;
    return new THREE.Box3(
      new THREE.Vector3(min.x - padding, min.z - padding, -max.y - padding),
      new THREE.Vector3(max.x + padding, max.z + padding, -min.y + padding)
    );
  };

  return {
    getCenterFromNodes,
    cameraObitTarget,
    cameraFirstPerson,
    showNodesNotInSelection,
    clipModelByNodes,
    fitCameraToNodeSelection,
    getNodeCollectionFromHierarchyNodeModel,
    assignStyletToInvertedNodeCollection,
    getNodeFromTreeId,
    getViewerNodeSelection,
    selectNodesByTags,
    assignColorByTagColor,
    getBoundingBoxFormAabbModel,
    fitCameraToBox3,
  };
};

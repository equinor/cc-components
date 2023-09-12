import {
  BoundingBoxClipper,
  CogniteCadModel,
  IndexSet,
  InvertedNodeCollection,
  NodeAppearance,
  TreeIndexNodeCollection,
} from '@cognite/reveal';
import CameraControls, {
  AabbModel,
  AssetMetadataSimpleDto,
  CameraControlsExtended,
  Echo3dViewer,
  EchoSetupObject,
  HierarchyClient,
  HierarchyNodeModel,
  SelectedNodeInformation,
  combineHierarchyAabbs,
  convertHierarchyAabbToThreeBox3,
  getNumericRange,
} from '@equinor/echo-3d-viewer';
import { get3dPositionFromAabbMinMaxValues } from '@equinor/echo-3d-viewer/dist/src/utils/calculationUtils';
import * as THREE from 'three';
import { Box3, Color, Vector3 } from 'three';

CameraControls.install({ THREE });

export interface TagColor {
  tag: string;
  color: Color;
}

export interface SelectNodesByTagOptions {
  fitToSelection?: boolean;
  appearance?: NodeAppearance;
  duration?: number | undefined;
  radiusFactor?: number | undefined;
  invertedAppearance?: NodeAppearance;
}

export class SelectionService {
  private hierarchyClient: HierarchyClient;
  private viewer: Echo3dViewer;

  constructor(private modelMeta: AssetMetadataSimpleDto, echoInstance: EchoSetupObject) {
    this.hierarchyClient = echoInstance.hierarchyApiClient;
    this.viewer = echoInstance.viewer;
  }

  get model(): CogniteCadModel {
    const currentModel = this.viewer.getModel(
      this.modelMeta.id,
      this.modelMeta.revisionNumber
    );
    if (!currentModel) throw new Error('No model Awaitable for SelectionService');
    return currentModel;
  }

  getCombinedAAbbsFromNodes(nodes: HierarchyNodeModel[]): AabbModel | null {
    const aabbs = nodes.reduce((allAabbs: AabbModel[], highlightedNode) => {
      if (highlightedNode.aabb) allAabbs.push(highlightedNode.aabb);
      return allAabbs;
    }, []);
    const aabb = combineHierarchyAabbs(aabbs);

    return aabb;
  }

  getNodesByTags = async (tags: string[]) => {
    return (
      await this.hierarchyClient.findNodesByTagList(this.modelMeta.hierarchyId, tags)
    ).results;
  };

  async selectNodesByTags(tags: string[], options?: SelectNodesByTagOptions) {
    const nodes = await this.getNodesByTags(tags);
    const nodeCollection = this.getNodeCollectionFromHierarchyNodeModel(nodes);

    const appearance = this.resetStyleToNodeAppearance(options?.appearance);

    this.model.assignStyledNodeCollection(
      nodeCollection,
      options?.appearance || {
        color: new Color(177 / 255, 140 / 255, 255 / 255),
        renderInFront: true,
      }
    );

    this.assignStyletToInvertedNodeCollection(nodeCollection, appearance);

    if (options?.fitToSelection)
      this.fitCameraToNodeSelection(nodes, options?.duration || 0, options?.radiusFactor);

    return nodes;
  }

  getNodeTagInfoFromHierarchyNodeModel(
    nodes: HierarchyNodeModel[]
  ): SelectedNodeInformation[] {
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
  }

  async assignColorByTagColor(tagColors: TagColor[], options?: SelectNodesByTagOptions) {
    const nodes = await this.getNodesByTags(tagColors.map((tagColor) => tagColor.tag));
    this.assignColorToNodesByTagColor(nodes, tagColors);

    if (options?.fitToSelection) {
      await this.fitCameraToNodeSelection(
        nodes,
        options?.duration || 0,
        options?.radiusFactor
      );
    }

    return nodes;
  }

  assignColorToNodesByTagColor(nodes: HierarchyNodeModel[], tagColors: TagColor[]) {
    const nodeCollectionsMap = this.getNodeCollectionsMap(nodes, tagColors);

    Object.values(nodeCollectionsMap).forEach((collection) => {
      const nodeCollection = this.getNodeCollectionFromHierarchyNodeModel(
        collection.nodes
      );
      this.model.assignStyledNodeCollection(nodeCollection, {
        color: collection.color,
        renderInFront: true,
      });
    });

    this.assignStyletToInvertedNodeCollection(
      this.getNodeCollectionFromHierarchyNodeModel(nodes)
    );
  }
  resetStyleToNodeAppearance(appearance?: NodeAppearance) {
    const newAppearance = appearance || this.model.getDefaultNodeAppearance();
    this.model.styledNodeCollections.forEach((nodeCollection) =>
      this.model.assignStyledNodeCollection(nodeCollection.nodeCollection, newAppearance)
    );

    return newAppearance;
  }

  async showNodesNotInSelection(nodes: HierarchyNodeModel[], show: boolean) {
    const newAppearance = {
      visible: show,
    };
    this.assignStyletToInvertedNodeCollection(
      this.getNodeCollectionFromHierarchyNodeModel(nodes),
      newAppearance
    );
  }

  getNodeCollectionsMap(nodes: HierarchyNodeModel[], tagColors: TagColor[]) {
    return tagColors.reduce((nodeCollectionsMap, tagColor) => {
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
  }

  getNodeCollectionFromHierarchyNodeModel(
    nodes: HierarchyNodeModel[]
  ): TreeIndexNodeCollection {
    const indices = new IndexSet();
    const numericRanges = nodes.filter((x) => x.endId).map((x) => getNumericRange(x));
    numericRanges.forEach((range) => indices.addRange(range));
    return new TreeIndexNodeCollection(indices);
  }

  assignStyletToInvertedNodeCollection(
    nodeCollection: TreeIndexNodeCollection,
    appearance: NodeAppearance = { renderGhosted: true }
  ) {
    const unassignedNodes = new InvertedNodeCollection(this.model, nodeCollection);
    this.model.assignStyledNodeCollection(unassignedNodes, appearance);
  }

  getBoxFromNodes(nodes: HierarchyNodeModel[]): Box3 | undefined {
    const aabb = this.getCombinedAAbbsFromNodes(nodes);

    if (aabb) {
      return convertHierarchyAabbToThreeBox3(aabb);
    }
  }

  getCenterFromNodes(nodes?: HierarchyNodeModel[]) {
    if (!nodes) return new Vector3(0, 0, 0);

    const aabb = this.getCombinedAAbbsFromNodes(nodes);
    return aabb ? get3dPositionFromAabbMinMaxValues(aabb) : new Vector3(0, 0, 0);
  }

  fitCameraToNodeSelection(
    nodes: HierarchyNodeModel[],
    duration?: number | undefined,
    radiusFactor?: number | undefined
  ) {
    const box = this.getBoxFromNodes(nodes);
    if (box) this.fitCameraToBox3(box, duration, radiusFactor);
  }

  fitCameraToBox3(
    box: Box3,
    duration?: number | undefined,
    radiusFactor?: number | undefined
  ) {
    this.viewer?.fitCameraToBoundingBox(box, duration, radiusFactor);
  }

  getBoundingBoxFormAabbModel(aabb: AabbModel, padding = 1) {
    const { min, max } = aabb;
    return new Box3(
      new Vector3(min.x - padding, min.z - padding, -max.y - padding),
      new Vector3(max.x + padding, max.z + padding, -min.y + padding)
    );
  }

  clipModelByNodes(nodes: HierarchyNodeModel[], isClipped: boolean, padding?: number) {
    const aabb = this.getCombinedAAbbsFromNodes(nodes);
    aabb && this.clipModelByAabbModel(aabb, isClipped, padding);
  }

  clipModelByAabbModel(aabb: AabbModel, isClipped: boolean, padding?: number): void {
    const boundingBox = this.getBoundingBoxFormAabbModel(aabb, padding);
    if (isClipped) {
      const clipper = new BoundingBoxClipper(boundingBox);
      this.viewer.setGlobalClippingPlanes(clipper.clippingPlanes);
    } else {
      this.viewer.setGlobalClippingPlanes([]);
    }
  }

  cameraObitTarget(target: Vector3) {
    const camera = this.viewer.cameraManager.getCamera();
    const cameraManager = this.viewer.getCameraManager();

    cameraManager.initializeOrbitControls(camera.position, target);
  }

  cameraFirstPerson() {
    const camera = this.viewer.cameraManager.getCamera();

    const cameraManager = this.viewer.getCameraManager();

    const controls = cameraManager.getControls();
    if (controls instanceof CameraControlsExtended) {
      const target = controls.getTarget(new Vector3());

      cameraManager.initializeFirstPersonControlsUsingTarget(camera.position, target);
    }
  }
}

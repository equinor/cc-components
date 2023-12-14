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
  CancelToken,
  Echo3dViewer,
  EchoSetupObject,
  HierarchyClient,
  HierarchyNodeModel,
  getTagNoRefNoAndAabbByNodeId,
} from '@equinor/echo-3d-viewer';

import * as THREE from 'three';
import { Box3, Color, Vector3 } from 'three';
import { NodeService } from './nodeService';

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

export class SelectionService extends NodeService {
  private hierarchyClient: HierarchyClient;
  private viewer: Echo3dViewer;

  constructor(private modelMeta: AssetMetadataSimpleDto, echoInstance: EchoSetupObject) {
    super();
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
  
  findNodesByTags = async (tags: string[], signal?: AbortSignal) => {
    return (
      await this.hierarchyClient.findNodesByTagList(
        this.modelMeta.hierarchyId,
        tags,
        signal
      )
    ).results;
  };

  getNodeFromTreeId = async (
    treeIndex: number,
    cancellationToken: CancelToken = CancelToken.none
  ) => {
    return await getTagNoRefNoAndAabbByNodeId(
      treeIndex,
      this.modelMeta.hierarchyId,
      cancellationToken
    );
  };

  async selectNodesByTags(tags: string[], options?: SelectNodesByTagOptions) {
    const nodes = await this.findNodesByTags(tags, options?.signal);
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

  async assignColorByTagColor(tagColors: TagColor[], options?: SelectNodesByTagOptions) {
    const nodes = await this.findNodesByTags(tagColors.map((tagColor) => tagColor.tag));
    this.assignColorToNodesByTagColor(nodes, tagColors);

    if (options?.fitToSelection) {
      this.fitCameraToNodeSelection(nodes, options?.duration || 0, options?.radiusFactor);
    }

    return nodes;
  }

  assignColorToNodesByTagColor(
    nodes: HierarchyNodeModel[],
    tagColors: TagColor[],
    appearance: NodeAppearance = {}
  ) {
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
      this.getNodeCollectionFromHierarchyNodeModel(nodes),
      appearance
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
  }

  assignStyletToInvertedNodeCollection(
    nodeCollection: TreeIndexNodeCollection,
    appearance: NodeAppearance
  ) {
    const unassignedNodes = new InvertedNodeCollection(this.model, nodeCollection);
    this.model.assignStyledNodeCollection(unassignedNodes, appearance);
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

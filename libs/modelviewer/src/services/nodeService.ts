import {
  AabbModel,
  HierarchyNodeModel,
  SelectedNodeInformation,
  combineHierarchyAabbs,
  getNumericRange,
} from '@equinor/echo-3d-viewer';
import { get3dPositionFromAabbMinMaxValues } from '@equinor/echo-3d-viewer/dist/src/utils/calculationUtils';
import { ViewerNodeSelection } from '../types/viewerNodeSelection';
import * as THREE from 'three';
import { IndexSet, TreeIndexNodeCollection } from '@cognite/reveal';

export class NodeService {
  getViewerNodeSelection = (nodes: HierarchyNodeModel[]): ViewerNodeSelection[] => {
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

  getNodeTagInfoFromHierarchyNodeModel = (
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

  getNodeCollectionFromHierarchyNodeModel(
    nodes: HierarchyNodeModel[]
  ): TreeIndexNodeCollection {
    const indices = new IndexSet();
    const numericRanges = nodes.filter((x) => x.endId).map((x) => getNumericRange(x));
    numericRanges.forEach((range) => indices.addRange(range));
    return new TreeIndexNodeCollection(indices);
  }

  getCombinedAAbbsFromNodes(nodes: HierarchyNodeModel[]): AabbModel | null {
    const aabbs = nodes.reduce((allAabbs: AabbModel[], highlightedNode) => {
      if (highlightedNode.aabb) allAabbs.push(highlightedNode.aabb);
      return allAabbs;
    }, []);
    const aabb = combineHierarchyAabbs(aabbs);

    return aabb;
  }

  getCenterFromNodes(nodes?: HierarchyNodeModel[]) {
    if (!nodes) return new THREE.Vector3(0, 0, 0);

    const aabb = this.getCombinedAAbbsFromNodes(nodes);
    return aabb ? get3dPositionFromAabbMinMaxValues(aabb) : new THREE.Vector3(0, 0, 0);
  }

  getBoxFromNodes(nodes: HierarchyNodeModel[]): THREE.Box3 | undefined {
    const aabb = this.getCombinedAAbbsFromNodes(nodes);

    if (aabb) {
      return this.getBoundingBoxFormAabbModel(aabb);
    }
  }

  getBoundingBoxFormAabbModel(aabb: AabbModel, padding = 1) {
    const { min, max } = aabb;
    return new THREE.Box3(
      new THREE.Vector3(min.x - padding, min.z - padding, -max.y - padding),
      new THREE.Vector3(max.x + padding, max.z + padding, -min.y + padding)
    );
  }
}

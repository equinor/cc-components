import { AabbModel, Echo3dViewer, combineHierarchyAabbs } from '@equinor/echo-3d-viewer';
import { Cluster } from '../types/cluster';
import { HtmlOverlayToolHandler, ViewerNodeSelection } from '../services';
import { HtmlOverlayTool } from '@cognite/reveal';
import { OverlayTag } from '../types/overlayTags';

export const createClusterAabb = (clusters: Cluster[]) => {
  const aabbs = clusters.reduce((allAabbs: AabbModel[], cluster) => {
    if (cluster.userData.aabb) allAabbs.push(cluster.userData.aabb);
    return allAabbs;
  }, []);

  return combineHierarchyAabbs(aabbs);
};

export const createClusterOverlay = (cluster: Cluster[]) => {
  const element = document.createElement('div');
  element.innerText = `${cluster.length}`;
  element.className = 'tag-cluster';
  element.title = `${cluster.map((item) => item.userData.e3dTagNo)}`;

  return element;
};

export const createHtmlOverlayToolHandler = (
  viewer: Echo3dViewer,
  cb: (clusters: Cluster[]) => HTMLDivElement
) => {
  return new HtmlOverlayToolHandler(
    new HtmlOverlayTool(viewer, {
      clusteringOptions: {
        mode: 'overlapInScreenSpace',
        createClusterElementCallback: cb,
      },
    })
  );
};

export const createOverlayTags = (viewNodes: ViewerNodeSelection[]): OverlayTag[] => {
  return viewNodes.map((vs, i) => {
    return {
      key: `${vs.tagNo}_${i}`,
      tagNo: vs.tagNo,
      position3d: vs.position,
      aabb: vs.aabb,
      boundingBox: vs.boundingBox,
    };
  });
};

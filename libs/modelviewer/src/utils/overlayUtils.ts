import { AabbModel, Echo3dViewer, combineHierarchyAabbs } from '@equinor/echo-3d-viewer';
import { Cluster } from '../types/cluster';
import { HtmlOverlayToolHandler, ViewerNodeSelection } from '../services';
import { HtmlOverlayTool } from '@cognite/reveal';
import { OverlayTag, TagMap, TagOverlay } from '../types/overlayTags';

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

export const createTagMap = (tagOverlays: TagOverlay[]) => {
  return tagOverlays.reduce((tagMap, tagOverlay) => {
    tagMap[tagOverlay.tagNo] = tagOverlay;
    return tagMap;
  }, {} as TagMap);
};

export const createOverlayTags = (
  viewNodes: ViewerNodeSelection[],
  tagMap: TagMap
): OverlayTag[] => {
  const keys = Object.keys(tagMap);
  return viewNodes.reduce((overlayTags, viewNode, index) => {
    if (keys.includes(viewNode.tagNo)) {
      overlayTags.push({
        key: `${viewNode.tagNo}_${index}`,
        tagNo: viewNode.tagNo,
        position: viewNode.position,
        aabb: viewNode.aabb,
        boundingBox: viewNode.boundingBox,
        type: tagMap[viewNode.tagNo].type,
        description: tagMap[viewNode.tagNo].description,
        status: tagMap[viewNode.tagNo].status,
        icon: tagMap[viewNode.tagNo].icon,
        color: tagMap[viewNode.tagNo].color,
      });
    }
    return overlayTags;
  }, [] as OverlayTag[]);
};

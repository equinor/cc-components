import { useCallback, useEffect, useRef, useMemo } from 'react';
import { useModelViewerContext, useSelectionContext } from '../providers';

import { HtmlOverlayToolHandler } from '../services';

import { getBoundingBoxFormAabbModel } from '../utils';
import {
  createClusterAabb,
  createClusterOverlay,
  createHtmlOverlayToolHandler,
  createOverlayTags,
} from '../utils/overlayUtils';
import { Cluster } from '../types/cluster';
import { TagMap } from '../types/overlay';

export function useOverlay(tagOverlay: TagMap) {
  const { echoInstance } = useModelViewerContext();

  const { viewNodes } = useSelectionContext();

  const overlayTool = useRef<HtmlOverlayToolHandler | null>(null);

  const createClusterElementCallback = useCallback(
    (clusters: Cluster[]) => {
      const compositeElement = createClusterOverlay(clusters);
      compositeElement.onclick = () => {
        const aabb = createClusterAabb(clusters);
        if (aabb) {
          const box = getBoundingBoxFormAabbModel(aabb);

          echoInstance?.viewer.cameraManager.fitCameraToBoundingBox(box);
        }
      };
      return compositeElement;
    },
    [echoInstance]
  );

  useEffect(() => {
    if (echoInstance && !overlayTool.current) {
      overlayTool.current = createHtmlOverlayToolHandler(
        echoInstance.viewer,
        createClusterElementCallback
      );
    }
  }, [echoInstance]);

  const filter = useMemo(
    () => Object.values(tagOverlay).map((t) => t.tagNo),
    [tagOverlay]
  );

  const overlayTags = useMemo(
    () =>
      createOverlayTags(viewNodes).filter((tag) =>
        filter ? filter.includes(tag.tagNo) : true
      ),
    [viewNodes, filter]
  );

  return { overlayTags, overlayTool };
}

import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { useModelViewerContext, useSelectionContext } from '../providers';

import { HtmlOverlayToolHandler } from '../services';

import { getBoundingBoxFormAabbModel } from '../utils';
import {
  createClusterAabb,
  createClusterOverlay,
  createHtmlOverlayToolHandler,
  createOverlayTags,
  createTagMap,
} from '../utils/overlayUtils';
import { Cluster } from '../types/cluster';

export function useOverlay() {
  const { echoInstance } = useModelViewerContext();
  const { tagList: tagsOverlay } = useSelectionContext();

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

  const overlayTags = useMemo(
    () => (tagsOverlay ? createOverlayTags(viewNodes, createTagMap(tagsOverlay)) : []),
    [viewNodes, tagsOverlay]
  );

  return { overlayTags, overlayTool };
}

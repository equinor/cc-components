import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AabbModel, HierarchyNodeModel } from '@equinor/echo-3d-viewer';
import { Color, Vector3 } from 'three';
import { defaultTagColor } from '../components/tag-item/TagItem';
import { useSelectionControls } from '../services/selectionService';
import { TagOverlay } from '../types/overlayTags';
import { ViewerNodeSelection } from '../types/viewerNodeSelection';
import { useConfig } from './configProvider';
import { useQuery } from '@tanstack/react-query';

interface SelectionContextState {
  currentNodes: HierarchyNodeModel[];
  viewNodes: ViewerNodeSelection[];
  tagList: TagOverlay[];
  notFoundTagList: TagOverlay[];
  visibleTags: string[];
  isFetchingNodes: boolean;

  selectNodesByTags(tags: string[]): Promise<HierarchyNodeModel[] | undefined>;
  selectNodes(tagOverly: TagOverlay[]): Promise<HierarchyNodeModel[] | undefined>;
  orbit(): void;
  firstPerson(): void;
  fitCameraToAAbb(aabb: AabbModel): void;
  toggleTags(tags: string[]): void;
}

const SelectionContext = createContext({} as SelectionContextState);

export const useSelectionContext = () => useContext(SelectionContext);

type Props = {
  tagsOverlay: TagOverlay[];
} & PropsWithChildren;

export const SelectionContextProvider = (props: Props) => {
  const { tagsOverlay, children } = props;

  const config = useConfig();
  const selectionControls = useSelectionControls();

  const [visibleTags, setVisibleTags] = useState<string[]>([]);

  const tagList: TagOverlay[] = useMemo(() => {
    return tagsOverlay.map((tagOverlay) => {
      if (!config.displayStatusColor) {
        return tagOverlay;
      }

      const color =
        tagOverlay.status && config.statusResolver
          ? config.statusResolver(tagOverlay.status)
          : defaultTagColor;

      return { ...tagOverlay, color };
    });
  }, [tagsOverlay, config.displayStatusColor]);

  const { data: currentNodes, isFetching: isFetchingNodes } = useQuery({
    queryKey: ['echo-viewer', tagList.map((x) => x.tagNo)],
    queryFn: async () => {
      return await selectNodes(tagList);
    },
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const viewNodes = useMemo((): ViewerNodeSelection[] => {
    return selectionControls?.getViewerNodeSelection(currentNodes) || [];
  }, [currentNodes]);

  const notFoundTagList = useMemo(() => {
    if (viewNodes.length === tagList.length || viewNodes.length === 0) return [];

    const tagSet = tagList.reduce((acc, item) => {
      acc[item.tagNo] = item;
      return acc;
    }, {} as Record<string, TagOverlay>);

    viewNodes.forEach((node) => {
      if (tagSet[node.tagNo]) {
        delete tagSet[node.tagNo];
      }
    });

    return Object.values(tagSet);
  }, [viewNodes, tagList]);

  const selectNodes = async (tags: TagOverlay[]) => {
    const hasColors = tags.some((x) => x.color);

    if (!hasColors) {
      const elements = tags.map((x) => x.tagNo);
      return await selectNodesByTags(elements);
    }

    return await selectNodesByTagColor(tags);
  };

  const selectNodesByTags = async (tags: string[]) => {
    const nodes = await selectionControls?.selectNodesByTags(tags, {
      fitToSelection: true,
      radiusFactor: config.defaultRadiusFactor,
    });

    return nodes;
  };

  const selectNodesByTagColor = async (tags: TagOverlay[]) => {
    const elements = tags.map((tag) => ({
      tag: tag.tagNo,
      color: new Color(tag.color),
    }));

    const nodes = await selectionControls?.assignColorByTagColor(elements, {
      fitToSelection: true,
      radiusFactor: config.defaultCroppingDistance,
    });

    return nodes;
  };

  const orbit = () => {
    if (currentNodes && selectionControls) {
      const target = selectionControls.getCenterFromNodes(currentNodes);
      selectionControls.cameraObitTarget(target);
    }
  };

  const firstPerson = () => {
    selectionControls?.cameraFirstPerson();
  };

  const fitCameraToAAbb = useCallback(
    (aabb: AabbModel, duration?: number) => {
      if (selectionControls) {
        const box3 = selectionControls.getBoundingBoxFormAabbModel(aabb);
        selectionControls.fitCameraToBox3(
          box3,
          duration || config.defaultCameraMoveDuration,
          config.defaultRadiusFactor
        );
      }
    },
    [selectionControls]
  );

  const toggleVisibleTags = (tags: string[]) => {
    const elements: string[] = tags.reduce((acc, tag) => {
      if (acc.includes(tag)) {
        acc = acc.filter((tagNo) => tagNo !== tag);
      } else {
        acc = [...acc, tag];
      }
      return acc;
    }, visibleTags);

    setVisibleTags(elements);
  };

  useEffect(() => {
    setVisibleTags(tagList.map((x) => x.tagNo));
  }, [tagList]);

  useEffect(() => {
    const padding = config.defaultCroppingDistance;
    selectionControls.clipModelByNodes(currentNodes, true, padding);
  }, [currentNodes]);

  return (
    <SelectionContext.Provider
      value={{
        currentNodes,
        viewNodes,
        visibleTags,
        tagList,
        notFoundTagList,
        isFetchingNodes,
        selectNodesByTags,
        selectNodes,
        orbit,
        firstPerson,
        fitCameraToAAbb,
        toggleTags: toggleVisibleTags,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};


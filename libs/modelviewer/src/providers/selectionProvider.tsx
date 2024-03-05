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
import { TagColor, useSelectionControls } from '../services/selectionService';
import { TagOverlay } from '../types/overlayTags';
import { ViewerNodeSelection } from '../types/viewerNodeSelection';
import { useConfig } from './configProvider';

interface SelectionContextState {
  selectNodesByTags(tags: string[]): Promise<HierarchyNodeModel[] | undefined>;
  selectNodesByTagColor(tags: TagColor[]): Promise<HierarchyNodeModel[] | undefined>;
  selectNodesByTagsOverlay(
    tagOverly: TagOverlay[]
  ): Promise<HierarchyNodeModel[] | undefined>;
  orbit(): void;
  firstPerson(): void;
  fitCameraToAAbb(aabb: AabbModel): void;
  currentNodes: HierarchyNodeModel[];
  viewNodes: ViewerNodeSelection[];
  tagList: TagOverlay[];
  notFoundTagList: TagOverlay[];
  getCurrentNodes(): HierarchyNodeModel[] | undefined;
  setTags: (tagOverlay: string[] | TagOverlay[], options?: { color: string }) => void;
  toggleTags(tags: string[]): void;
  filterTags: string[];
  isTagFetching: boolean;
}

const SelectionContext = createContext({} as SelectionContextState);

interface Test extends Event {
  detail: {
    point: Vector3;
    treeIndex: number;
  };
}

type Props = {
  tagsOverlay?: TagOverlay[] | string[];
} & PropsWithChildren;

export const SelectionContextProvider = (props: Props) => {
  const { tagsOverlay, children } = props;

  const [tagList, setTagList] = useState<TagOverlay[]>([]);
  const config = useConfig();

  const selectionControls = useSelectionControls();

  const handleTagList = (
    tagOverlay: string[] | TagOverlay[],
    options?: { color: string }
  ) => {
    if (typeof tagOverlay[0] === 'string') {
      setTagList(
        (tagOverlay as string[]).map((tag) => ({
          tagNo: tag,
          description: tag,
          color: options?.color,
          icon: 'tag',
        }))
      );
      return;
    } else if (config?.displayStatusColor) {
      setTagList(
        (tagOverlay as TagOverlay[]).map((tagOverlay) => {
          const color =
            tagOverlay.status && config.statusResolver
              ? config.statusResolver(tagOverlay.status)
              : defaultTagColor;
          return {
            ...tagOverlay,
            color,
          };
        })
      );
    } else {
      setTagList(tagOverlay as TagOverlay[]);
    }
  };

  useEffect(() => {
    if (tagsOverlay) {
      handleTagList(tagsOverlay);
    }
  }, [tagsOverlay]);

  const [currentNodes, setCurrentNodes] = useState<HierarchyNodeModel[]>([]);
  const [isTagFetching, setIsTagFetching] = useState<boolean>(true);

  useEffect(() => {
    if (tagList.length > 0) {
      selectNodesByTagsOverlay(tagList)
        .then((nodes) => {
          if (nodes) {
            setCurrentNodes(nodes);
          }
        })
        .finally(() => {
          setIsTagFetching(false);
        });
    }
  }, [tagList]);

  useEffect(() => {
    window.addEventListener('selectionStarted', (e) => {
      const index = (e as Test).detail.treeIndex;
      selectionControls?.getNodeFromTreeId(index).then((data) => {
        data;
      });
    });
    return () => {
      // window.removeEventListener('selectionStarted');
    };
  }, [selectionControls]);

  const selectNodesByTags = async (tags: string[]) => {
    const nodes = await selectionControls?.selectNodesByTags(tags, {
      fitToSelection: true,
      radiusFactor: config.defaultRadiusFactor,
    });
    setCurrentNodes(nodes || []);
    if (nodes)
      selectionControls?.clipModelByNodes(nodes, true, config.defaultCroppingDistance);
    return nodes;
  };

  const selectNodesByTagsOverlay = async (tags: TagOverlay[]) => {
    if (tags[0].color) {
      const nodes = await selectNodesByTagColor(
        tags.map((tag) => ({ tag: tag.tagNo, color: new Color(tag.color) }))
      );
      return nodes;
    }
    return await selectNodesByTags(tags.map((t) => t.tagNo));
  };

  const getCurrentNodes = () => {
    if (currentNodes) return currentNodes;
  };

  const selectNodesByTagColor = async (tags: TagColor[]) => {
    const nodes = await selectionControls?.assignColorByTagColor(tags, {
      fitToSelection: true,
      radiusFactor: config.defaultCroppingDistance,
    });
    if (nodes) {
      setCurrentNodes(nodes);
      selectionControls?.clipModelByNodes(nodes, true, config.defaultCroppingDistance);
    }
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

  const [filterTags, setFilterTags] = useState<string[]>([]);

  const viewNodes = useMemo((): ViewerNodeSelection[] => {
    return selectionControls?.getViewerNodeSelection(currentNodes) || [];
  }, [currentNodes, selectionControls]);

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

  const toggleTags = (tags: string[]) => {
    const tagList: string[] = tags.reduce((acc, tag) => {
      if (acc.includes(tag)) {
        acc = acc.filter((tagNo) => tagNo !== tag);
      } else {
        acc = [...acc, tag];
      }
      return acc;
    }, filterTags);
    setFilterTags(tagList);
  };

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

  useEffect(() => {
    setFilterTags(tagList.map((tagItem) => tagItem.tagNo));
  }, [tagList]);

  console.log({ component: 5 });

  return (
    <SelectionContext.Provider
      value={{
        selectNodesByTags,
        selectNodesByTagColor,
        selectNodesByTagsOverlay,
        orbit,
        firstPerson,
        fitCameraToAAbb,
        currentNodes,
        viewNodes,
        filterTags,
        getCurrentNodes,
        setTags: handleTagList,
        tagList,
        notFoundTagList,
        toggleTags,
        isTagFetching,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelectionContext = () => {
  const context = useContext(SelectionContext);
  if (!context) throw new Error('Context provider not found!');
  return context;
};




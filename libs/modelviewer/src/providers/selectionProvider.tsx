import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useModelViewerContext } from './modelViewerProvider';

import { useModelContext } from './modelsProvider';
import {
  SelectionService,
  TagColor,
  ViewerNodeSelection,
} from '../services/selectionService';
import { AabbModel, HierarchyNodeModel } from '@equinor/echo-3d-viewer';
import { Color, Vector3 } from 'three';
import { TagOverlay } from '../types/overlayTags';
import { defaultTagColor } from '../components/tag-item/TagItem';

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
  selectionService?: SelectionService;
  getCurrentNodes(): HierarchyNodeModel[] | undefined;
  getSelectionService(): SelectionService | undefined;
  setTags: (tagOverlay: string[] | TagOverlay[], options?: { color: string }) => void;
}

const SelectionContext = createContext({} as SelectionContextState);

interface Test extends Event {
  detail: {
    point: Vector3;
    treeIndex: number;
  };
}

export const SelectionContextProvider = ({
  children,
  tagsOverlay,
  selectionOptions,
}: PropsWithChildren<{
  tagsOverlay?: TagOverlay[] | string[];
  selectionOptions?: {
    statusResolver?: (status: string) => string;
    displayStatusColor?: boolean;
  };
}>) => {
  const [tagList, setTagList] = useState<TagOverlay[]>([]);

  const handleTagList = (
    tagOverlay: string[] | TagOverlay[],
    options?: { color: string }
  ) => {
    if (typeof tagOverlay[0] === 'string') {
      setTagList(
        (tagOverlay as string[]).map((tag) => ({
          tagNo: tag,
          description: 'Unknown tag',
          color: options?.color,
        }))
      );
      return;
    } else if (selectionOptions?.displayStatusColor) {
      setTagList(
        (tagOverlay as TagOverlay[]).map((tagOverlay) => {
          const color =
            tagOverlay.status && selectionOptions.statusResolver
              ? selectionOptions.statusResolver(tagOverlay.status)
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

  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelContext();
  const [currentNodes, setCurrentNodes] = useState<HierarchyNodeModel[]>([]);

  const selectionService = useMemo(() => {
    if (modelMeta && echoInstance) {
      return new SelectionService(modelMeta, echoInstance);
    }
  }, [modelMeta, echoInstance]);

  useEffect(() => {
    if (tagList.length > 0 && selectionService) {
      selectNodesByTagsOverlay(tagList).then((nodes) => nodes && setCurrentNodes(nodes));
    }
  }, [tagList, selectionService]);

  useEffect(() => {
    window.addEventListener('selectionStarted', (e) => {
      const index = (e as Test).detail.treeIndex;
      selectionService?.getNodeFromTreeId(index).then((data) => {
        data;
      });
    });
    return () => {
      // window.removeEventListener('selectionStarted');
    };
  }, [selectionService]);

  const selectNodesByTags = async (tags: string[]) => {
    const nodes = await selectionService?.selectNodesByTags(tags, {
      fitToSelection: true,
    });
    setCurrentNodes(nodes || []);
    if (nodes) selectionService?.clipModelByNodes(nodes, true);
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

  const getSelectionService = () => {
    if (selectionService) return selectionService;
  };

  const selectNodesByTagColor = async (tags: TagColor[]) => {
    const nodes = await selectionService?.assignColorByTagColor(tags, {
      fitToSelection: true,
    });
    if (nodes) {
      setCurrentNodes(nodes);
      selectionService?.clipModelByNodes(nodes, true);
    }
    return nodes;
  };

  const orbit = () => {
    if (currentNodes && selectionService) {
      const target = selectionService.getCenterFromNodes(currentNodes);
      selectionService.cameraObitTarget(target);
    }
  };

  const firstPerson = () => {
    selectionService?.cameraFirstPerson();
  };

  const viewNodes = useMemo(() => {
    console.log(currentNodes);
    return selectionService?.getViewerNodeSelection(currentNodes) || [];
  }, [currentNodes, selectionService]);

  const fitCameraToAAbb = useCallback(
    (aabb: AabbModel) => {
      if (selectionService) {
        const box3 = selectionService.getBoundingBoxFormAabbModel(aabb, 0);
        selectionService.fitCameraToBox3(box3, 10, 0);
      }
    },
    [selectionService]
  );

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
        selectionService,
        getCurrentNodes,
        getSelectionService,
        setTags: handleTagList,
        tagList,
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

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
import { Vector3 } from 'three';

interface SelectionContextState {
  selectNodesByTags(tags: string[]): Promise<void>;
  selectNodesByTagColor(tags: TagColor[]): Promise<void>;
  orbit(): void;
  firstPerson(): void;
  fitCameraToAAbb(aabb: AabbModel): void;
  currentNodes: HierarchyNodeModel[];
  viewNodes: ViewerNodeSelection[];
  selectionService?: SelectionService;
  getCurrentNodes(): HierarchyNodeModel[] | undefined;
  getSelectionService(): SelectionService | undefined;
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
  tags,
}: PropsWithChildren<{ tags: string[] }>) => {
  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelContext();
  const [currentNodes, setCurrentNodes] = useState<HierarchyNodeModel[]>([]);

  const selectionService = useMemo(() => {
    if (modelMeta && echoInstance) {
      return new SelectionService(modelMeta, echoInstance);
    }
  }, [modelMeta, echoInstance]);

  useEffect(() => {
    if (tags && selectionService) selectionService.selectNodesByTags(tags);
  }, [tags, selectionService]);

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
    return selectionService?.getViewerNodeSelection(currentNodes) || [];
  }, [currentNodes]);

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
        orbit,
        firstPerson,
        fitCameraToAAbb,
        currentNodes,
        viewNodes,
        selectionService,
        getCurrentNodes,
        getSelectionService,
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

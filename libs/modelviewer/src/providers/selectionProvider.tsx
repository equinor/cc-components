import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useModelViewerContext } from './modelViewerProvider';

import { HierarchyNodeModel } from '@equinor/echo-3d-viewer';
import { SelectionService, TagColor } from '../services/selectionService';
import { useModelContext } from './modelsProvider';

interface SelectionContextState {
  selectNodesByTags(tags: string[]): Promise<void>;
  selectNodesByTagColor(tags: TagColor[]): Promise<void>;
  getCurrentNodes(): HierarchyNodeModel[] | undefined;
  getSelectionService(): SelectionService | undefined;
  isClipped: boolean;
  setClipped: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectionContext = createContext({} as SelectionContextState);

export const SelectionContextProvider = ({
  children,
  tags,
}: PropsWithChildren<{ tags: string[] }>) => {
  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelContext();
  const [currentNodes, setCurrentNodes] = useState<HierarchyNodeModel[] | undefined>();
  const [isClipped, setClipped] = useState<boolean>(true);
  const selectionService = useMemo(() => {
    if (modelMeta && echoInstance) {
      return new SelectionService(modelMeta, echoInstance);
    }
  }, [modelMeta, echoInstance]);

  useEffect(() => {
    if (tags && selectionService) selectionService.selectNodesByTags(tags);
  }, [tags, selectionService]);

  const selectNodesByTags = async (tags: string[]) => {
    const nodes = await selectionService?.selectNodesByTags(tags, {
      fitToSelection: true,
    });
    setCurrentNodes(nodes);
    if (nodes) selectionService?.clipModelByNodes(nodes, isClipped);
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
    setCurrentNodes(nodes);
    if (nodes) selectionService?.clipModelByNodes(nodes, isClipped);
  };

  return (
    <SelectionContext.Provider
      value={{
        selectNodesByTags,
        selectNodesByTagColor,
        getCurrentNodes,
        getSelectionService,
        isClipped,
        setClipped,
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

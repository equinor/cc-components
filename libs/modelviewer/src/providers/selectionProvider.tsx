import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useModelViewerContext } from './modelViewerProvider';

import { useModelContext } from './modelsProvider';
import { SelectionService, TagColor } from '../services/selectionService';
import { HierarchyNodeModel } from '@equinor/echo-3d-viewer';

interface SelectionContextState {
  selectNodesByTags(tags: string[]): Promise<void>;
  selectNodesByTagColor(tags: TagColor[]): Promise<void>;
  orbit(): void;
  firstPerson(): void;
}

const SelectionContext = createContext({} as SelectionContextState);

export const SelectionContextProvider = ({
  children,
  tags,
}: PropsWithChildren<{ tags: string[] }>) => {
  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelContext();
  const [currentNodes, setCurrentNodes] = useState<HierarchyNodeModel[] | undefined>();

  const selectionService = useMemo(() => {
    if (modelMeta && echoInstance) {
      return new SelectionService(modelMeta, echoInstance);
    }
  }, [modelMeta, echoInstance]);

  useEffect(() => {
    if (tags && selectionService) selectionService.selectNodesByTags(tags);
  }, [tags, selectionService]);

  const selectNodesByTags = async (tags: string[]) => {
    await selectionService?.selectNodesByTags(tags);
  };

  const selectNodesByTagColor = async (tags: TagColor[]) => {
    const nodes = await selectionService?.assignColorByTagColor(tags, {
      fitToSelection: true,
    });
    setCurrentNodes(nodes);
    if (nodes) selectionService?.clipModelByNodes(nodes, true);
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

  return (
    <SelectionContext.Provider
      value={{
        selectNodesByTags,
        selectNodesByTagColor,
        orbit,
        firstPerson,
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

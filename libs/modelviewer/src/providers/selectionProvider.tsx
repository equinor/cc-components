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
  toggleOrbit(): void;
  toggleClipping(): void;
  isClipped: boolean;
  fitToScreen(): void;
  toggleShowNodesNotInSelection(): void;
}

const SelectionContext = createContext({} as SelectionContextState);

export const SelectionContextProvider = ({
  children,
  tags,
}: PropsWithChildren<{ tags: string[] }>) => {
  const { hierarchyApiClient, viewer } = useModelViewerContext();
  const { modelMeta, model } = useModelContext();
  const [currentNodes, setCurrentNodes] = useState<HierarchyNodeModel[] | undefined>();
  const [isClipped, setClipped] = useState<boolean>(true);
  const [isShowNodesNotInSelection, setisShowNodesNotInSelection] =
    useState<boolean>(true);

  const selectionService = useMemo(() => {
    if (modelMeta && hierarchyApiClient && viewer && model) {
      return new SelectionService(modelMeta, model, hierarchyApiClient, viewer);
    }
  }, [modelMeta, hierarchyApiClient, model, viewer]);

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

  const selectNodesByTagColor = async (tags: TagColor[]) => {
    const nodes = await selectionService?.assignColorByTagColor(tags, {
      fitToSelection: true,
    });
    setCurrentNodes(nodes);
    if (nodes) selectionService?.clipModelByNodes(nodes, isClipped);

    // get Nodes without selecting them
    //selectionService?.getNodesByTags(tags.map((t) => t.tag));

    // Clipping model
    // const centerPos = selectionService?.getCenterFromNodes(nodes);
    // if (centerPos) selectionService?.toggleObitSelection(centerPos);
  };

  const toggleOrbit = () => {
    if (currentNodes) {
      selectionService?.toggleObitSelection(currentNodes);
    }
  };

  const toggleClipping = () => {
    if (currentNodes) {
      selectionService?.clipModelByNodes(currentNodes, isClipped);
      setClipped(!isClipped);
    }
  };

  const fitToScreen = () => {
    if (currentNodes) {
      selectionService?.fitCameraToNodeSelection(currentNodes);
    }
  };

  const toggleShowNodesNotInSelection = () => {
    if (currentNodes) {
      selectionService?.showNodesNotInSelection(currentNodes, isShowNodesNotInSelection);
      setisShowNodesNotInSelection(!isShowNodesNotInSelection);
    }
  };

  return (
    <SelectionContext.Provider
      value={{
        selectNodesByTags,
        selectNodesByTagColor,
        toggleOrbit,
        toggleClipping,
        isClipped,
        fitToScreen,
        toggleShowNodesNotInSelection,
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
function getCombinedAAbbsFromNodes(
  nodes: import('@equinor/echo-3d-viewer').HierarchyNodeModel[] | undefined
) {
  throw new Error('Function not implemented.');
}

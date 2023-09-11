import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useModelViewerContext } from './modelViewerProvider';

import { NodeAppearance, NodeOutlineColor } from '@cognite/reveal';
import { HierarchyNodeModel } from '@equinor/echo-3d-viewer';
import { Color } from 'three';
import { SelectionService, TagColor } from '../services/selectionService';
import { useModelContext } from './modelsProvider';

interface SelectionContextState {
  selectNodesByTags(tags: string[]): Promise<void>;
  selectNodesByTagColor(tags: TagColor[]): Promise<void>;
  orbit(): void;
  toggleClipping(): void;
  isClipped: boolean;
  isOrbit: boolean;
  isFocus: boolean;
  fitToScreen(): void;
  toggleFocus(): void;
  toggleCameraMode(): void;
  toggleShowNodesNotInSelection(): void;
  firstPerson(): void;
  assignGrayscaleToInvertedNodeCollection(): void;
  assignDefaultColorToInvertedNodeCollection(): void;
  assignOutlineToInvertedNodeCollection(): void;
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
  const [isOrbit, setIsOrbit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isShowNodesNotInSelection, setisShowNodesNotInSelection] =
    useState<boolean>(true);

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

  const selectNodesByTagColor = async (tags: TagColor[]) => {
    const nodes = await selectionService?.assignColorByTagColor(tags, {
      fitToSelection: true,
    });
    setCurrentNodes(nodes);
    if (nodes) selectionService?.clipModelByNodes(nodes, isClipped);
  };

  const orbit = () => {
    if (currentNodes && selectionService) {
      const target = selectionService.getCenterFromNodes(currentNodes);
      selectionService.cameraObitTarget(target);
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

  const toggleCameraMode = () => {
    if (isOrbit) {
      firstPerson();
    } else {
      orbit();
    }
    setIsOrbit(!isOrbit);
  };

  const toggleFocus = () => {
    toggleShowNodesNotInSelection();
    setIsFocus(!isFocus);
  };

  const assignGrayscaleToInvertedNodeCollection = () => {
    if (currentNodes) {
      const appearance: NodeAppearance = {
        color: new Color(128, 128, 128),
        outlineColor: NodeOutlineColor.NoOutline,
        renderGhosted: false,
      };
      selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes);
      selectionService?.assignStyletToInvertedNodeCollection(
        selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes),
        appearance
      );
    }
  };

  const assignDefaultColorToInvertedNodeCollection = () => {
    if (currentNodes) {
      const appearance: NodeAppearance = {
        color: new Color(0, 0, 0),
        outlineColor: NodeOutlineColor.NoOutline,
        renderGhosted: false,
      };
      selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes);
      selectionService?.assignStyletToInvertedNodeCollection(
        selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes),
        appearance
      );
    }
  };

  const assignOutlineToInvertedNodeCollection = () => {
    if (currentNodes) {
      const appearance: NodeAppearance = {
        outlineColor: NodeOutlineColor.Red,
        color: new Color(10, 10, 10),
        renderGhosted: false,
      };
      selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes);
      selectionService?.assignStyletToInvertedNodeCollection(
        selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes),
        appearance
      );
    }
  };

  const toggleShowNodesNotInSelection = () => {
    if (currentNodes) {
      selectionService?.showNodesNotInSelection(currentNodes, isShowNodesNotInSelection);
      setisShowNodesNotInSelection(!isShowNodesNotInSelection);
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
        toggleClipping,
        isClipped,
        isOrbit,
        isFocus,
        fitToScreen,
        toggleFocus,
        toggleShowNodesNotInSelection,
        assignGrayscaleToInvertedNodeCollection,
        assignDefaultColorToInvertedNodeCollection,
        assignOutlineToInvertedNodeCollection,
        toggleCameraMode,
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

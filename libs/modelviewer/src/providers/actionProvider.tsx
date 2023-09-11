import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

import { useModelContext } from './modelsProvider';
import { useSelectionContext } from './selectionProvider';
import { NodeAppearance, NodeOutlineColor } from '@cognite/reveal';
import { Color } from 'three';

interface ActionContextState {
  hideModel(): void;
  showModel(): void;
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

const ActionContext = createContext({} as ActionContextState);

export const ActionContextProvider = ({ children }: PropsWithChildren) => {
  const { getModel } = useModelContext();
  const { getCurrentNodes, getSelectionService, isClipped, setClipped } =
    useSelectionContext();

  const [isOrbit, setIsOrbit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isShowNodesNotInSelection, setisShowNodesNotInSelection] =
    useState<boolean>(true);

  const currentNodes = useMemo(() => {
    return getCurrentNodes();
  }, [getCurrentNodes()]);

  const selectionService = useMemo(() => {
    return getSelectionService();
  }, [getSelectionService()]);

  const hideModel = () => {
    const model = getModel();
    if (model) {
      const appearance = model.getDefaultNodeAppearance();
      model.setDefaultNodeAppearance({ ...appearance, visible: false });
    }
  };

  const showModel = () => {
    const model = getModel();
    if (model) {
      const appearance = model.getDefaultNodeAppearance();
      model.setDefaultNodeAppearance({ ...appearance, visible: true });
    }
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
    <ActionContext.Provider
      value={{
        hideModel,
        showModel,
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
    </ActionContext.Provider>
  );
};

export const useActions = () => {
  const context = useContext(ActionContext);
  if (!context) throw new Error('Context provider not found!');
  return context;
};

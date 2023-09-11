import { NodeAppearance, NodeOutlineColor } from '@cognite/reveal';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { Color } from 'three';
import { useModelContext } from './modelsProvider';
import { useSelectionContext } from './selectionProvider';

interface ActionContextState {
  hideModel(): void;
  showModel(): void;
  isClipped: boolean;
  isOrbit: boolean;
  isFocus: boolean;
  toggleFocus(): void;
  toggleClipping(): void;
  toggleCameraMode(): void;
  fitToScreen(): void;
  assignAppearanceToInvertedNodeCollection(appearance: NodeAppearance): void;
}

const ActionContext = createContext({} as ActionContextState);

export const ActionContextProvider = ({ children }: PropsWithChildren) => {
  const { getModel } = useModelContext();
  const { getCurrentNodes, getSelectionService, isClipped, setClipped } =
    useSelectionContext();

  const [isOrbit, setIsOrbit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

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
    if (currentNodes) {
      selectionService?.showNodesNotInSelection(currentNodes, isFocus);
      setIsFocus(!isFocus);
    }
  };

  const assignAppearanceToInvertedNodeCollection = (appearance: NodeAppearance) => {
    if (currentNodes) {
      selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes);
      selectionService?.assignStyletToInvertedNodeCollection(
        selectionService?.getNodeCollectionFromHierarchyNodeModel(currentNodes),
        appearance
      );
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
        toggleClipping,
        isClipped,
        isOrbit,
        isFocus,
        fitToScreen,
        toggleFocus,
        assignAppearanceToInvertedNodeCollection,
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

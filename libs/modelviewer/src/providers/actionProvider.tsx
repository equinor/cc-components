import { NodeAppearance, NodeOutlineColor } from '@cognite/reveal';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Color } from 'three';
import { useModelContext } from './modelsProvider';
import { useSelectionContext } from './selectionProvider';
import { useConfig } from './configProvider';

interface ActionContextState {
  hideModel(): void;
  showModel(): void;
  isClipped: boolean;
  isOrbit: boolean;
  isFocus: boolean;
  toggleFocus(): void;
  toggleClipping(): void;
  toggleCameraMode(): void;
  fitToScreen(duration?: number, radiusFactor?: number): void;
  assignAppearanceToInvertedNodeCollection(appearance: NodeAppearance): void;
}

const ActionContext = createContext<ActionContextState | undefined>(undefined);

export const ActionContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { getModel } = useModelContext();
  const { getCurrentNodes, getSelectionService } = useSelectionContext();

  const { defaultCroppingDistance, defaultCameraMoveDuration, defaultRadiusFactor } =
    useConfig();

  const [isOrbit, setIsOrbit] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [isClipped, setClipped] = useState(true);
  const currentNodes = getCurrentNodes();
  const selectionService = getSelectionService();

  const setModelVisibility = (isVisible: boolean) => {
    const model = getModel();
    if (model) {
      const appearance = model.getDefaultNodeAppearance();
      model.setDefaultNodeAppearance({ ...appearance, visible: isVisible });
    }
  };

  useEffect(() => {
    isOrbit ? orbit() : firstPerson();
  }, [isOrbit, currentNodes]);

  const hideModel = () => setModelVisibility(false);
  const showModel = () => setModelVisibility(true);

  const orbit = () => {
    if (currentNodes && selectionService) {
      const target = selectionService.getCenterFromNodes(currentNodes);
      selectionService.cameraObitTarget(target);
    }
  };

  const firstPerson = () => selectionService?.cameraFirstPerson();

  const toggleCameraMode = () => {
    setIsOrbit((isOrbit) => !isOrbit);
  };

  const toggleFocus = () => {
    if (currentNodes) {
      setIsFocus(!isFocus);
      selectionService?.showNodesNotInSelection(currentNodes, isFocus);
    }
  };

  const toggleClipping = (croppingDistance?: number) => {
    const newClippedValue = !isClipped;
    setClipped(newClippedValue);
    if (currentNodes && selectionService) {
      selectionService.clipModelByNodes(
        currentNodes,
        newClippedValue,
        croppingDistance || defaultCroppingDistance
      );
    }
  };

  const fitToScreen = (duration?: number, radiusFactor?: number) => {
    if (currentNodes) {
      selectionService?.fitCameraToNodeSelection(
        currentNodes,
        duration || defaultCameraMoveDuration,
        radiusFactor || defaultRadiusFactor
      );
    }
  };

  const assignAppearanceToInvertedNodeCollection = (appearance: NodeAppearance) => {
    if (currentNodes && selectionService) {
      const collection =
        selectionService.getNodeCollectionFromHierarchyNodeModel(currentNodes);
      selectionService.assignStyletToInvertedNodeCollection(collection, appearance);
    }
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
  if (!context) throw new Error('useActions must be used within ActionContextProvider');
  return context;
};

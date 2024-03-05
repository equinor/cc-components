import { NodeAppearance } from '@cognite/reveal';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useSelectionContext } from './selectionProvider';
import { useConfig } from './configProvider';
import { useSelectionControls } from '../services';
import { useModelContext } from './modelProvider';

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
  const selectionService = useSelectionControls();

  const { model } = useModelContext();
  const { getCurrentNodes } = useSelectionContext();

  const { defaultRadiusFactor, defaultCroppingDistance } = useConfig();

  const [isOrbit, setIsOrbit] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [isClipped, setClipped] = useState(true);
  const currentNodes = getCurrentNodes();

  const setModelVisibility = (isVisible: boolean) => {
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

  const fitToScreen = (radiusFactor?: number) => {
    if (currentNodes) {
      selectionService?.fitCameraToNodeSelection(
        currentNodes,
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

  console.log({ component: 6 });

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

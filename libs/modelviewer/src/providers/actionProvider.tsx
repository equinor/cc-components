import { NodeAppearance } from '@cognite/reveal';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useTagSelectionContext } from './tagSelectionProvider';
import { useConfig } from './configProvider';
import { useModelSelectionControls } from '../services';
import { useModelContext } from './modelProvider';

interface ActionContextState {
  isClipped: boolean;
  isOrbit: boolean;
  isFocus: boolean;
  hideModel(): void;
  showModel(): void;
  toggleFocus(): void;
  toggleClipping(): void;
  toggleCameraMode(): void;
  fitToScreen(duration?: number, radiusFactor?: number): void;
  assignAppearanceToInvertedNodeCollection(appearance: NodeAppearance): void;
}

const ActionContext = createContext({} as ActionContextState);

export const useActions = () => useContext(ActionContext);

export const ActionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const selectionService = useModelSelectionControls();

  const { model } = useModelContext();
  const { currentNodes } = useTagSelectionContext();

  const { defaultRadiusFactor, defaultCroppingDistance } = useConfig();

  const [isOrbit, setIsOrbit] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [isClipped, setClipped] = useState(true);

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

export default ActionProvider;
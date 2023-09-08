import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import { useModelViewerContext } from './modelViewerProvider';

import { useModelContext } from './modelsProvider';
import { SelectionService } from '../services/selectionService';
import { InvertedNodeCollection, NodeCollection } from '@cognite/reveal';

interface ActionContextState {
  hideModel(): void;
  showModel(): void;
}

const ActionContext = createContext({} as ActionContextState);

export const ActionContextProvider = ({ children }: PropsWithChildren) => {
  const { hierarchyApiClient, viewer } = useModelViewerContext();
  const { model } = useModelContext();

  const hideModel = () => {
    const appearance = model?.getDefaultNodeAppearance();
    //  const unassignedNodes = new InvertedNodeCollection(model, );
    model?.setDefaultNodeAppearance({ ...appearance, visible: false });
  };

  const showModel = () => {
    const appearance = model?.getDefaultNodeAppearance();
    model?.setDefaultNodeAppearance({ ...appearance, visible: true });
  };

  return (
    <ActionContext.Provider
      value={{
        hideModel,
        showModel,
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

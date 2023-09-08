import { PropsWithChildren, createContext, useContext } from 'react';

import { useModelContext } from './modelsProvider';

interface ActionContextState {
  hideModel(): void;
  showModel(): void;
}

const ActionContext = createContext({} as ActionContextState);

export const ActionContextProvider = ({ children }: PropsWithChildren) => {
  const { getModel } = useModelContext();

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

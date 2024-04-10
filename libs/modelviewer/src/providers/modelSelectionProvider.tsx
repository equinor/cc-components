import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

import ModelSelectionDialog from '../components/model-selection-dialog/modelSelectionDialog';
import { Loading } from '../components/loading/loading';
import { useModels } from '../hooks/useModels';

type ModelSelectionContextType = {
  hasAccess: boolean;
  isModelSelectionVisible: boolean;
  models: AssetMetadataSimpleDto[];
  modelMeta?: AssetMetadataSimpleDto;
  setShowModelDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setModelMeta: (model: AssetMetadataSimpleDto) => void;
};

const ModelSelectionContext = createContext({} as ModelSelectionContextType);

export const useModelSelectionContext = () => useContext(ModelSelectionContext);

export const ModelSelectionProvider = ({ children }: PropsWithChildren<{}>) => {
  const { models, modelMeta, hasAccess, setModelMeta } = useModels();

  const [isModelSelectionVisible, setShowModelDialog] = useState(!modelMeta);

  return (
    <ModelSelectionContext.Provider
      value={{
        hasAccess,
        isModelSelectionVisible,
        models,
        modelMeta,
        setShowModelDialog,
        setModelMeta,
      }}
    >
      <ModelSelectionDialog />
      {modelMeta ? children : <Loading />}
    </ModelSelectionContext.Provider>
  );
};

export default ModelSelectionProvider;
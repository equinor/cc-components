import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { useQuery } from '@tanstack/react-query';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useModelSelectionService } from '../services/useModelSelectionService';

import { usePlantData } from './plantDataProvider';
import ModelSelectionDialog from '../components/model-selection-dialog/modelSelectionDialog';
import { Loading } from '../components/loading/loading';

type ModelSelectionContextType = {
  hasAccess: boolean;
  isModelSelectionVisible: boolean;
  isLoading: boolean;
  models: AssetMetadataSimpleDto[];
  modelMeta?: AssetMetadataSimpleDto;
  setShowModelDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setModelMeta: (model: AssetMetadataSimpleDto) => void;
};

const ModelSelectionContext = createContext({} as ModelSelectionContextType);

export const useModelSelectionContext = () => useContext(ModelSelectionContext);

export const ModelSelectionProvider = ({ children }: PropsWithChildren<{}>) => {
  const modelSelectionService = useModelSelectionService();
  const { plantData } = usePlantData();

  const [isModelSelectionVisible, setShowModelDialog] = useState(false);
  const [modelMeta, setModelMeta] = useState<AssetMetadataSimpleDto>();

  const { data: models, isLoading } = useQuery<AssetMetadataSimpleDto[]>({
    queryKey: ['models', plantData],
    queryFn: async () => {
      return await modelSelectionService.getModelsForPlant(plantData.plantCode);
    },
    refetchOnWindowFocus: false,
  });

  const defaultModel = useMemo(() => {
    const platformSectionId = modelSelectionService.getDefaultModel(plantData.plantCode);
    return models?.find((x) => x.platformSectionId === platformSectionId);
  }, [models, plantData.plantCode]);

  /**
   * Loads a default model if the user previously selected to remember
   * the choice of model. If not, a dialog for model selection is shown.
   */
  useEffect(() => {
    if (!defaultModel && models) setShowModelDialog(true);
    else setModelMeta(defaultModel);
  }, [models, defaultModel]);

  return (
    <ModelSelectionContext.Provider
      value={{
        hasAccess: models ? models.length > 0 : false,
        isModelSelectionVisible,
        isLoading,
        models: models ?? [],
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
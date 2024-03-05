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

import { ModelService, ViewerOptions } from '../services/modelsService';
import { useModelViewerContext } from './modelViewerProvider';
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
  setModel: (model: AssetMetadataSimpleDto, options?: ViewerOptions) => void;
};

const ModelSelectionContext = createContext({} as ModelSelectionContextType);

export const useModelSelectionContext = () => useContext(ModelSelectionContext);

export const ModelSelectionProvider = ({ children }: PropsWithChildren<{}>) => {
  const { echoInstance } = useModelViewerContext();
  const { plantData } = usePlantData();

  const [isModelSelectionVisible, setShowModelDialog] = useState(false);
  const [modelMeta, setModelMeta] = useState<AssetMetadataSimpleDto>();

  const setModel = async (model: AssetMetadataSimpleDto, options?: ViewerOptions) => {
    const modelMeta = await modelService.loadModelById(model.id, options);
    setModelMeta(modelMeta);
  };

  // TODO: Fix this. Move away from using useMemo to load a class. Use a hook instead.
  const modelService = useMemo(() => {
    return new ModelService(echoInstance);
  }, [echoInstance]);

  const { data: models, isLoading } = useQuery<AssetMetadataSimpleDto[]>({
    queryKey: ['models', plantData],
    queryFn: async () => {
      return await modelService.getModelsForPlant(plantData.plantCode);
    },
    enabled: Boolean(modelService),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  // Model ID of the default model (if the user have selected to store a default selected model)
  const defaultModel = useMemo(() => {
    const localModelId = modelService?.getLocalModel(plantData.plantCode);
    return models.find((x) => x.platformSectionId === localModelId);
  }, [modelService, plantData.plantCode]);

  useEffect(() => {
    if (defaultModel) setModel(defaultModel);
    else setShowModelDialog(true);
  }, [defaultModel]);

  console.log({ component: 3 });

  return (
    <ModelSelectionContext.Provider
      value={{
        hasAccess: models.length > 0,
        isModelSelectionVisible,
        isLoading,
        models,
        modelMeta,
        setShowModelDialog,
        setModel,
      }}
    >
      <ModelSelectionDialog />
      {modelMeta ? children : <Loading />}
    </ModelSelectionContext.Provider>
  );
};

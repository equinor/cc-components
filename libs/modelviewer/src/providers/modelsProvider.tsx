import { CogniteCadModel } from '@cognite/reveal';
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

type ModelContextType = {
  hasAccess: boolean;
  showSelector: boolean;
  models: AssetMetadataSimpleDto[] | undefined;
  setShowModelDialog: React.Dispatch<React.SetStateAction<boolean>>;
  loadModelById: (
    modelId: number,
    options?: ViewerOptions
  ) => Promise<AssetMetadataSimpleDto>;
  setLocalModel(model: AssetMetadataSimpleDto): void;
  isLoading: boolean;
  modelMeta?: AssetMetadataSimpleDto;
  getModel(): CogniteCadModel | undefined;
};

const ModelContext = createContext({} as ModelContextType);

export const ModelContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [showSelector, setShowModelDialog] = useState(false);
  const [modelMeta, setModelMeta] = useState<AssetMetadataSimpleDto>();

  const { echoInstance } = useModelViewerContext();

  const modelService = useMemo(() => {
    if (echoInstance) {
      return new ModelService(echoInstance);
    }
  }, [echoInstance]);

  const { plantData } = usePlantData();

  const { data: models, isLoading } = useQuery<AssetMetadataSimpleDto[]>(
    ['models', plantData],
    async () => {
      if (!modelService) {
        throw new Error('No model service provided');
      }
      const data = await modelService.getModelsForPlant(plantData.plantCode);
      return data;
    },
    {
      enabled: Boolean(modelService),
      refetchOnWindowFocus: false,
    }
  );

  const hasAccess = useMemo(() => {
    return models?.length !== 0;
  }, [models]);

  //init setup from local store
  useEffect(() => {
    if (hasAccess) {
      const localModelId = modelService?.getLocalModel(plantData.plantCode);
      if (localModelId !== undefined && models !== undefined) {
        const selectedModel = models.find(
          (model) => model.platformSectionId === localModelId
        );
        if (selectedModel?.id) {
          modelService
            ?.loadModelById(selectedModel.id)
            .then((modelMeta) => setModelMeta(modelMeta));
          setShowModelDialog(false);
          return;
        }
      }
      setShowModelDialog(true);
    }
  }, [models, plantData]);

  const loadModelById = async (modelId: number, options?: ViewerOptions) => {
    if (!modelService) throw new Error('No Model Service');

    const modelMeta = await modelService.loadModelById(modelId, options);
    setModelMeta(modelMeta);
    return modelMeta;
  };

  const setLocalModel = (model: AssetMetadataSimpleDto) => {
    return modelService?.setLocalModel(model);
  };
  const getModel = () => {
    return modelService?.model;
  };

  return (
    <ModelContext.Provider
      value={{
        hasAccess,
        showSelector,
        models,
        setShowModelDialog,
        loadModelById,
        setLocalModel,
        isLoading,
        modelMeta,
        getModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) throw new Error('Context provider not found!');
  return context;
};

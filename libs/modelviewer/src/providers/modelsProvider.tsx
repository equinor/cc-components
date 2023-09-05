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
import { useModelViewerContext } from './modelViewerProvider';
import { ModelService, ViewerOptions } from '../services/modelsService';
import { CogniteCadModel } from '@cognite/reveal';

type ModelContextType = {
  hasAccess: boolean;
  showSelector: boolean;
  models: AssetMetadataSimpleDto[] | undefined;
  setShowModelDialog: React.Dispatch<React.SetStateAction<boolean>>;
  loadModelById: (modelId: number, options?: ViewerOptions) => Promise<CogniteCadModel>;
  setLocalModel(model: AssetMetadataSimpleDto): void;
  isLoading: boolean;
  currenModelMeta?: AssetMetadataSimpleDto;
};

const ModelContext = createContext({} as ModelContextType);

export const ModelContextProvider = ({
  children,
  plantCode,
}: PropsWithChildren<{
  plantCode: string;
}>) => {
  const [showSelector, setShowModelDialog] = useState(false);
  const [currenModelMeta, setCurrenModelMeta] = useState<AssetMetadataSimpleDto>();

  const { viewer, modelApiClient } = useModelViewerContext();

  const modelService = useMemo(() => {
    if (modelApiClient && viewer) {
      return new ModelService({ modelApiClient, viewer });
    }
  }, [modelApiClient && viewer]);

  const { data: models, isLoading } = useQuery<AssetMetadataSimpleDto[]>(
    ['models', plantCode],
    async () => {
      if (!modelService) {
        throw new Error('No model service provided');
      }
      const data = await modelService.getModelsForPlant(plantCode);
      return data;
    },
    {
      enabled: Boolean(modelService),
      refetchOnWindowFocus: false,
    }
  );

  //Access
  const hasAccess = useMemo(() => {
    return models?.length !== 0;
  }, [models]);

  useEffect(() => {
    if (!modelService) return;

    const sub = modelService.modelMeta$.subscribe(setCurrenModelMeta);
    return () => {
      sub.unsubscribe();
    };
  }, [modelService]);

  //init setup from local store
  useEffect(() => {
    if (hasAccess) {
      const localModelId = modelService?.getLocalModel(plantCode);
      if (localModelId !== undefined) {
        const selectedModel = models!.find(
          (model) => model.platformSectionId === localModelId
        );
        if (selectedModel?.id) {
          modelService?.loadModelById(selectedModel.id);
          setShowModelDialog(false);
          return;
        }
      }
      setShowModelDialog(true);
    }
  }, [models, plantCode]);

  const loadModelById = async (modelId: number, options?: ViewerOptions) => {
    if (!modelService) {
      throw new Error('No model service provided');
    }
    return modelService?.loadModelById(modelId, options);
  };
  const setLocalModel = (model: AssetMetadataSimpleDto) => {
    if (!modelService) {
      throw new Error('No model service provided');
    }
    return modelService?.setLocalModel(model);
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
        currenModelMeta,
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

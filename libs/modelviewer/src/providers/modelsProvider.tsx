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
import { useError } from '../hooks/useMessageBoundary';
import { useModelViewerContext } from './modelViewerProvider';

type ModelContextType = {
  hasAccess: boolean;
  showSelector: boolean;
  models: AssetMetadataSimpleDto[] | undefined;
  setShowModelDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  localModelId: number;
};

const ModelContext = createContext<ModelContextType>({
  hasAccess: false,
  showSelector: false,
  models: [],
  setShowModelDialog: () => {},
  isLoading: false,
  localModelId: 0,
});

export const ModelContextProvider = ({
  children,
  plantCode,
}: PropsWithChildren<{
  plantCode: string;
}>) => {
  const [showSelector, setShowModelDialog] = useState(false);
  const [localModelId, setLocalModelId] = useState(0);
  const { setError } = useError();

  const { modelViewer, isSetup } = useModelViewerContext();

  const {
    data: models,
    isLoading,
    isError,
    error,
  } = useQuery<AssetMetadataSimpleDto[]>(
    ['models', plantCode],
    async () => {
      const data = await modelViewer!.getModelsForPlant(plantCode);
      return data;
    },
    {
      enabled: isSetup,
      refetchOnWindowFocus: false,
    }
  );

  //Access
  const hasAccess = useMemo(() => {
    return models?.length !== 0;
  }, [models]);

  //init setup from local store
  useEffect(() => {
    if (hasAccess) {
      const localModelId = modelViewer!.getLocalModel(plantCode);
      if (localModelId !== undefined) {
        const selectedModel = models!.find(
          (model) => model.platformSectionId === localModelId
        );
        if (selectedModel?.id) {
          modelViewer!.loadModelById(selectedModel.id);
          setLocalModelId(selectedModel.id);
          setShowModelDialog(false);
          return;
        }
      }
      setShowModelDialog(true);
    }
  }, [models, plantCode]);
  return (
    <ModelContext.Provider
      value={{
        hasAccess,
        showSelector,
        models,
        setShowModelDialog,
        isLoading,
        localModelId,
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

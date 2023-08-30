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
import { IModuleViewerProvider } from '../modules/provider';
import { useModelViewerContext } from './modelViewerProvider';

type ModelContextType = {
  hasAccess: boolean;
  showSelector: boolean;
  models: AssetMetadataSimpleDto[] | undefined;
  setShowModelDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const ModelContext = createContext<ModelContextType>({
  hasAccess: false,
  showSelector: false,
  models: [],
  setShowModelDialog: () => {},
  isLoading: false,
});

export const ModelContextProvider = ({
  children,
  plantCode,
}: PropsWithChildren<{
  plantCode: string;
}>) => {
  const [showSelector, setShowModelDialog] = useState(true);
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

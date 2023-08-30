import { IModuleViewerProvider } from '../modules/provider';
import { useModelContext } from '../providers/modelsProvider';

export const useModelSelection = (
  modelViewer: IModuleViewerProvider //JAH
) => {
  //Model selected
  const { models, setShowModelDialog } = useModelContext();
  const handleGoToModel = (selectedId: number, rememberChecked: boolean) => {
    modelViewer.loadModelById(selectedId);
    if (rememberChecked) {
      const selectedModel = models?.find((model) => model.id === selectedId);
      if (selectedModel) {
        modelViewer.setLocalModel(selectedModel);
      }
    }
    setShowModelDialog(false);
  };

  return {
    handleGoToModel,
  };
};

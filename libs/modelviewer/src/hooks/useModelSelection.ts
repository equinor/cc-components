import { useModelContext } from '../providers/modelsProvider';

export const useModelSelection = () => {
  const { models, setShowModelDialog, loadModelById, setLocalModel } = useModelContext();
  const handleGoToModel = (selectedId: number, rememberChecked: boolean) => {
    loadModelById(selectedId);
    if (rememberChecked) {
      const selectedModel = models?.find((model) => model.id === selectedId);
      if (selectedModel) {
        setLocalModel(selectedModel);
      }
    }
    setShowModelDialog(false);
  };

  return {
    handleGoToModel,
  };
};

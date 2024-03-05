import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';

import { useModelViewerContext } from '../providers';

const LOCAL_MODEL_ID_KEY = 'echoModelId';

export const useModelSelectionService = () => {
  const { echoInstance } = useModelViewerContext();

  const { modelApiClient } = echoInstance;

  const getModelsMeta = async (): Promise<AssetMetadataSimpleDto[]> => {
    try {
      const models = await modelApiClient.listModels('Reveal', '9', undefined, undefined);
      return models;
    } catch (error) {
      throw new Error('Could not load 3D models', { cause: error });
    }
  };

  const getModelsForPlant = async (plantCode: string) => {
    const models = await getModelsMeta();

    return models.filter(
      (model) => model.plantCode.toLowerCase() === plantCode.toLowerCase()
    );
  };

  const getDefaultModel = (plantCode: string): string | undefined => {
    const localModelsJson = localStorage.getItem(LOCAL_MODEL_ID_KEY);

    if (!localModelsJson) {
      return undefined;
    }

    const localModels = JSON.parse(localModelsJson);
    return localModels[plantCode.toLowerCase()] || undefined;
  };

  const setDefaultModel = (modelMeta: AssetMetadataSimpleDto): void => {
    const plantCode = modelMeta.plantCode;
    const platformSectionId = modelMeta.platformSectionId;

    const existingModelsJson = localStorage.getItem(LOCAL_MODEL_ID_KEY);
    const existingModels = existingModelsJson ? JSON.parse(existingModelsJson) : {};

    existingModels[plantCode.toLowerCase()] = platformSectionId;

    localStorage.setItem(LOCAL_MODEL_ID_KEY, JSON.stringify(existingModels));
  };

  return {
    getModelsForPlant,
    getDefaultModel,
    setDefaultModel,
  };
};

import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';

import { useModelViewerContext } from '../providers';
import { usePersistedDefaults } from './usePersistedDefaults';

export const useModelSelectionService = () => {
  const { echoInstance } = useModelViewerContext();
  const { getDefault, setDefault } = usePersistedDefaults('modelviewer.defaultModels', 'echoModelId');

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

  const getDefaultModel = (plantCode: string): string | undefined => getDefault(plantCode);

  const setDefaultModel = (modelMeta: AssetMetadataSimpleDto): void =>
    setDefault(modelMeta.plantCode, modelMeta.platformSectionId);

  return {
    getModelsForPlant,
    getDefaultModel,
    setDefaultModel,
  };
};

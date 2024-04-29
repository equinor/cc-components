import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useModelSelectionService } from '../services/useModelSelectionService';
import { usePlantContext } from '../providers/plantProvider';

export const useModels = () => {
  const modelSelectionService = useModelSelectionService();

  const { currentPlant } = usePlantContext();

  const { data: models } = useQuery<AssetMetadataSimpleDto[]>({
    queryKey: ['models', currentPlant],
    queryFn: async () => {
      return modelSelectionService.getModelsForPlant(currentPlant.plantCode);
    },
    refetchOnWindowFocus: false,
    suspense: true,
  });

  const defaultModelId = modelSelectionService.getDefaultModel(currentPlant.plantCode);

  const defaultModel = models?.find((x) => x.platformSectionId === defaultModelId);

  const [modelMeta, setModelMeta] = useState(defaultModel);

  return {
    modelMeta,
    setModelMeta,
    models: models ?? [],
    hasAccess: (models && models.length >= 0) ?? false,
  };
};

import { useQuery } from '@tanstack/react-query';

import { Plant } from '../services/usePlantSelectionService';
import { useModelViewerContext } from '../providers';

export const useAvailablePlants = (facility: string) => {
  const { echoClient } = useModelViewerContext();

  const { data, isLoading, error } = useQuery<Plant[]>({
    queryKey: ['available-plants', facility],
    queryFn: async () => {
      const result = await echoClient.json<Plant[]>('/EchoHub/plant-info');
      const allPlants = result as Plant[];

      const filtered = allPlants.filter(
        (plant) =>
          plant.plantCode.toLowerCase() === facility.toLowerCase() ||
          plant.installationCode.toLowerCase() === facility.toLowerCase()
      );

      return filtered;
    },
    cacheTime: 5 * 1000 * 60,
    suspense: true,
  });

  return {
    data: data ?? [],
    isLoading,
    error,
  };
};

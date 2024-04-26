import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { Plant } from '../services/usePlantSelectionService';
import { useModelViewerContext } from '../providers';

export const useAvailablePlants = (facility: string) => {
  const { echoClient } = useModelViewerContext();

  const { data, isLoading, error } = useSuspenseQuery<Plant[]>({
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
    gcTime: 5 * 1000 * 60,
  });

  return {
    data: data ?? [],
    isLoading,
    error,
  };
};

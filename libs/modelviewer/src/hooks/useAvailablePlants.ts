import { useAppModules } from '@equinor/fusion-framework-react-app';
import { useQuery } from '@tanstack/react-query';

import { ModuleViewer } from '../modules';
import { PlantData } from '../services/usePlantSelectionService';

export const useAvailablePlants = (facility: string) => {
  const { echoClient } = useAppModules<[ModuleViewer]>().moduleViewer;

  const { data, isLoading, error } = useQuery<PlantData[]>({
    queryKey: ['available-plants', facility],
    queryFn: async () => {
      const result = await echoClient.json<PlantData[]>('/EchoHub/plant-info');
      const allPlants = result as PlantData[];

      const filtered = allPlants.filter(
        (plant) =>
          plant.plantCode.toLowerCase() === facility.toLowerCase() ||
          plant.installationCode.toLowerCase() === facility.toLowerCase()
      );

      return filtered;
    },
    cacheTime: 5 * 1000 * 60,
  });

  return {
    data: data ?? [],
    isLoading,
    error,
  };
};

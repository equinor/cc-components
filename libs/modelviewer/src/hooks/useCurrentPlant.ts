import { useState } from 'react';

import { usePlantSelectionService } from '../services/usePlantSelectionService';
import { useAvailablePlants } from './useAvailablePlants';

export const useCurrentPlant = (facility: string) => {
  const plantSelectionService = usePlantSelectionService();

  const { data: plants } = useAvailablePlants(facility);

  const localPlantCode = plantSelectionService.getLocalPlant(facility);

  const defaultPlant = plants.find(
    (x) => x.plantCode.toLowerCase() === localPlantCode?.toLowerCase()
  );

  const [currentPlant, setCurrentPlant] = useState(defaultPlant || plants[0]);

  return {
    currentPlant,
    setCurrentPlant,
    plants,
  };
};

import { usePersistedDefaults } from './usePersistedDefaults';

export type Plant = {
  plantCode: string;
  installationCode: string;
  projectDescription: string;
  plantDirectory: string;
  availableInEcho3DWebReveal: boolean;
};

export const usePlantSelectionService = () => {
  const { getDefault, setDefault } = usePersistedDefaults('modelviewer.defaultPlants', 'echoPlantId');

  const getDefaultPlant = (instCode: string): string | undefined => getDefault(instCode);

  const setDefaultPlant = (plant: Plant) => setDefault(plant.installationCode, plant.plantCode);

  return {
    getDefaultPlant,
    setDefaultPlant,
  };
};

export type Plant = {
  plantCode: string;
  installationCode: string;
  projectDescription: string;
  plantDirectory: string;
  availableInEcho3DWebReveal: boolean;
};

export const usePlantSelectionService = () => {
  const LOCAL_PLANT_ID_KEY = 'echoPlantId';

  const getDefaultPlant = (instCode: string): string | undefined => {
    const localPlantJson = localStorage.getItem(LOCAL_PLANT_ID_KEY);

    if (localPlantJson) {
      const localModels = JSON.parse(localPlantJson);
      return localModels[instCode.toLowerCase()] || undefined;
    }

    return undefined;
  };

  const setDefaultPlant = (plant: Plant) => {
    const plantCode = plant.plantCode;
    const instCode = plant.installationCode;

    const existingModelsJson = localStorage.getItem(LOCAL_PLANT_ID_KEY);
    const existingModels = existingModelsJson ? JSON.parse(existingModelsJson) : {};

    existingModels[instCode.toLowerCase()] = plantCode;

    localStorage.setItem(LOCAL_PLANT_ID_KEY, JSON.stringify(existingModels));
  };

  return {
    getDefaultPlant,
    setDefaultPlant,
  };
};

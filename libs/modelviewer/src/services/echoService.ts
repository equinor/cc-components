import { IHttpClient } from '@equinor/fusion-framework-module-http';

export type PlantData = {
  plantCode: string;
  installationCode: string;
  projectDescription: string;
  plantDirectory: string;
  availableInEcho3DWebReveal: boolean;
};

const LOCAL_PLANT_ID_KEY = 'echoPlantId';
export class EchoService {
  #client: IHttpClient;
  constructor(client: IHttpClient) {
    this.#client = client;
  }

  async getAvailablePlants() {
    return await this.#client.json<PlantData[]>('/EchoHub/plant-info');
  }

  getLocalPlant(instCode: string): string | undefined {
    const localPlantJson = localStorage.getItem(LOCAL_PLANT_ID_KEY);
    if (localPlantJson) {
      const localModels = JSON.parse(localPlantJson);
      return localModels[instCode.toLowerCase()] || undefined;
    }
    return undefined;
  }

  setLocalPlant(plant: PlantData): void {
    const plantCode = plant.plantCode;
    const instCode = plant.installationCode;

    const existingModelsJson = localStorage.getItem(LOCAL_PLANT_ID_KEY);
    const existingModels = existingModelsJson ? JSON.parse(existingModelsJson) : {};

    existingModels[instCode.toLowerCase()] = plantCode;

    localStorage.setItem(LOCAL_PLANT_ID_KEY, JSON.stringify(existingModels));
  }
}

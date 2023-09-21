import { IHttpClient } from '@equinor/fusion-framework-module-http';

export type PlantData = {
  plantCode: string;
  installationCode: string;
  projectDescription: string;
  plantDirectory: string;
  availableInEcho3DWebReveal: boolean;
};

export class EchoService {
  #client: IHttpClient;
  constructor(client: IHttpClient) {
    this.#client = client;
  }

  async getAvailablePlants() {
    return await this.#client.json<PlantData[]>('/EchoHub/plant-info');
  }
}

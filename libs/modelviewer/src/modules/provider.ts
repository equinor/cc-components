import {
  AssetMetadataSimpleDto,
  Echo3dClient,
  Echo3dViewer,
  EchoSetupObject,
  HierarchyClient,
  ModelsClient,
  RendererConfiguration,
  setupEcho3dWeb,
} from '@equinor/echo-3d-viewer';
import { IModelViewerConfig } from './configurator';
import { tokens } from '@equinor/eds-tokens';
import { ModelService } from './services/modelsService';
import { ModuleViewer } from './module';
import { Observable } from 'rxjs';

export interface IModuleViewerProvider {
  setup(args: SetupArgs): Promise<void>;
  //loadModelByPlantCode(plantCode: string): void;
  setTagsSelection(tags?: string[]): void;
  loadModelById(modelId: number): void;
  clearTagSelection?(): void;
  updateTagsSelection?(): void;
  setLocalModel(model: AssetMetadataSimpleDto): void;
  getLocalModel(plantCode : string): string | undefined;
  getModelsForPlant(plantcode: string): Promise<AssetMetadataSimpleDto[]>;
  get modelsService(): ModelService | undefined;
}

type SetupArgs = {
  canvas: HTMLCanvasElement;
  plantFromSelectionId?: string;
  echoPlantId?: string;
};

export class ModuleViewerProvider implements IModuleViewerProvider {
  renderConfig: RendererConfiguration = {
    clearColor: tokens.colors.ui.background__info.hex,
  };
  config: IModelViewerConfig;

  private _modelsService?: ModelService;
  private _echoInstance?: EchoSetupObject;

  constructor(config: IModelViewerConfig) {
    this.config = config;
  }

  async setup(args: SetupArgs) {
    const { hierarchyClientConfig, modelClientConfig } = this.config;

    this._echoInstance = await setupEcho3dWeb(
      args.canvas,
      modelClientConfig,
      hierarchyClientConfig,
      this.renderConfig
    );

    const { modelApiClient, viewer } = this._echoInstance;

    this._modelsService = new ModelService({ modelApiClient, viewer });
  }
  /*
  loadModelByPlantCode(plantCode: string) {
    if (!this._modelsService)
      throw new Error('No modelService is available pleas call setup with SetupArgs');
    this._modelsService?.loadModel(plantCode, { enableSelectionByPicking: false });
  }
*/
  loadModelById(modelId: number) {
    if (!this._modelsService)
      throw new Error('No modelService is available pleas call setup with SetupArgs');
    this._modelsService?.loadModelById(modelId, { enableSelectionByPicking: false });
  }

  setTagsSelection(tags?: string[]): void {
    if (!tags) return;
  }

  async getModelsForPlant(plantCode: string): Promise<AssetMetadataSimpleDto[]> {
    if (!this.modelsService) {
      throw new Error('Models service is not available.');
    }

    const models = await this.modelsService.getModels();

    // Filter the models based on the provided plantCode
    const filteredModels = models.filter((model) => model.plantCode === plantCode);

    return filteredModels;
  }

  get modelsService() {
    return this._modelsService;
  }

  get client() {
    return this._echoInstance?.client;
  }

  disposeViewer() {
    this._echoInstance?.viewer.disposeAll();
  }

  getLocalModel(plantCode : string) {
    return this._modelsService?.getLocalModel(plantCode);
  }

  setLocalModel(model: AssetMetadataSimpleDto) {
    this._modelsService?.setLocalModel(model);
  }
}

declare global {
  interface Window {
    modelService: ModelService;
    viewer: Echo3dViewer;
  }
}

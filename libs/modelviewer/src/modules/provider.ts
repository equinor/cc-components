import {
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

export interface IModuleViewerProvider {
  setup(args: SetupArgs): Promise<void>;
  get echoInstance(): EchoSetupObject | undefined;
  get client(): Echo3dClient | undefined;
  get modelApiClient(): ModelsClient | undefined;
  get hierarchyApiClient(): HierarchyClient | undefined;
  get viewer(): Echo3dViewer | undefined;
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
  }

  get echoInstance() {
    return this._echoInstance;
  }
  get client() {
    return this.echoInstance?.client;
  }

  get hierarchyApiClient() {
    return this.echoInstance?.hierarchyApiClient;
  }
  get modelApiClient() {
    return this.echoInstance?.modelApiClient;
  }
  get viewer() {
    return this.echoInstance?.viewer;
  }

  disposeViewer() {
    this._echoInstance?.viewer.disposeAll();
  }
}

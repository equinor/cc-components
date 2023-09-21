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
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export interface IModuleViewerProvider {
  setup(args: SetupArgs): Promise<void>;
  get echoInstance(): EchoSetupObject | undefined;
  get client(): Echo3dClient | undefined;
  get modelApiClient(): ModelsClient | undefined;
  get hierarchyApiClient(): HierarchyClient | undefined;
  get viewer(): Echo3dViewer | undefined;
  get echoClient(): IHttpClient;
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
  private _echoClient: IHttpClient;

  constructor(config: IModelViewerConfig) {
    this.config = config;

    this._echoClient = config.echoClient;
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
  get echoClient() {
    return this._echoClient;
  }

  disposeViewer() {
    this._echoInstance?.viewer.disposeAll();
  }
}

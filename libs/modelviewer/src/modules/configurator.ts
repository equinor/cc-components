import { RendererConfiguration } from '@equinor/echo-3d-viewer';
import {
  BaseConfigBuilder,
  ConfigBuilderCallbackArgs,
} from '@equinor/fusion-framework-module';

export type ClientOptions = {
  baseUrl: string;
  scope: string;
};

export type ClientConfig = {
  baseUrl: string;
  getAccessToken(): Promise<string>;
};

export interface ModelViewerConfigOptions {
  hierarchyClientConfig: ClientOptions;
  modelClientConfig: ClientOptions;
}

export interface IModelViewerConfig {
  hierarchyClientConfig: ClientConfig;
  modelClientConfig: ClientConfig;
  renderConfig: RendererConfiguration;
}

export class ModelViewerConfigurator extends BaseConfigBuilder<IModelViewerConfig> {
  protected async _getAutModule({
    hasModule,
    requireInstance,
  }: ConfigBuilderCallbackArgs) {
    if (!hasModule('auth')) {
      throw new Error('Fusion MsalModule required to activate this module');
    }
    return await requireInstance('auth');
  }

  protected async _getActionTokenGenerator(
    scope: string,
    configBuilderArgs: ConfigBuilderCallbackArgs
  ) {
    const auth = await this._getAutModule(configBuilderArgs);

    return async () => {
      const token = await auth.acquireAccessToken({
        scopes: [scope],
      });
      if (!token) {
        throw Error('failed to acquire access token');
      }
      return token;
    };
  }

  setHierarchyClientConfig = ({ baseUrl, scope }: ClientOptions) => {
    this._set('hierarchyClientConfig', async (args) => {
      return {
        baseUrl,
        getAccessToken: await this._getActionTokenGenerator(scope, args),
      };
    });
  };

  setModelClientConfig = ({ baseUrl, scope }: ClientOptions) => {
    this._set('modelClientConfig', async (args) => {
      return {
        baseUrl,
        getAccessToken: await this._getActionTokenGenerator(scope, args),
      };
    });
  };
}

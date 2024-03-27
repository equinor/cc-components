import { RendererConfiguration } from '@equinor/echo-3d-viewer';
import {
  BaseConfigBuilder,
  ConfigBuilderCallbackArgs,
} from '@equinor/fusion-framework-module';
import { IAuthProvider } from '@equinor/fusion-framework-module-msal';

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
  echoClient: any;
  renderConfig: RendererConfiguration;
}

export class ModelViewerConfigurator extends BaseConfigBuilder<IModelViewerConfig> {
  private async _getAutModule({
    hasModule,
    requireInstance,
  }: ConfigBuilderCallbackArgs): Promise<IAuthProvider> {
    if (!hasModule('auth')) {
      throw new Error('Fusion MsalModule required to activate this module');
    }
    return await requireInstance('auth');
  }

  private async _getHttpModule({
    hasModule,
    requireInstance,
  }: ConfigBuilderCallbackArgs) {
    if (!hasModule('http')) {
      throw new Error('Fusion http module is required to activate this module');
    }
    return await requireInstance('http');
  }

  private async _getActionTokenGenerator(
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

  setEchoClientConfig = (config: ClientOptions) => {
    this._set('echoClient', async (args) => {
      const http = await this._getHttpModule(args);
      const client = http.createClient({
        baseUri: config.baseUrl,
        defaultScopes: [config.scope],
      });
      return client;
    });
  };
}

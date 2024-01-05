import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import { enableModelViewer } from '@cc-components/modelviewer';
import buildQuery from 'odata-query';

export const configure = async (config: IAppConfigurator, c: ComponentRenderArgs) => {
  enableContext(config, async (builder) => {
    builder.setContextType(['ProjectMaster']);
    builder.setContextParameterFn(({ search, type }) => {
      return buildQuery({
        search,
        filter: {
          type: {
            in: type,
          },
        },
      });
    });
  });

  const envConfig: WorkorderEnvConfig = c.env.config?.environment as WorkorderEnvConfig;

  if (!envConfig) {
    throw new Error('Failed to load environemnt config for workorder');
  }
  config.configureHttpClient('cc-app', {
    baseUri: envConfig?.uri,
    defaultScopes: envConfig?.defaultScopes,
  });

  enableAgGrid(config);
  enableModelViewer(config, (builder) => {
    builder.setHierarchyClientConfig({
      baseUrl: envConfig?.modelViewer!.hierarchyClient.baseUrl,
      scope: envConfig?.modelViewer!.hierarchyClient.scope,
    });
    builder.setModelClientConfig({
      baseUrl: envConfig?.modelViewer!.modelClient.baseUrl,
      scope: envConfig?.modelViewer!.modelClient.scope,
    });
    builder.setEchoClientConfig({
      baseUrl: envConfig?.modelViewer!.echoClient.baseUrl,
      scope: envConfig?.modelViewer!.echoClient.scope,
    });
  });
};

type ModelViewerEnvConfig = {
  hierarchyClient: {
    baseUrl: string;
    scope: string;
  };
  modelClient: {
    baseUrl: string;
    scope: string;
  };
  echoClient: {
    baseUrl: string;
    scope: string;
  };
};
type WorkorderEnvConfig = {
  uri?: string;
  defaultScopes?: string[];
  modelViewer?: ModelViewerEnvConfig;
};

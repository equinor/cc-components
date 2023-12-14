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
      baseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net',
      scope: 'ebc04930-bf9c-43e5-98bc-bc90865600b8/user_impersonation',
    });
    builder.setModelClientConfig({
      baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
      scope: 'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
    });
    builder.setEchoClientConfig({
      baseUrl: 'https://dt-echopedia-api-dev.azurewebsites.net',
      scope: 'aef35d97-53d4-4fd0-adaf-c5a514b38436/user_impersonation',
    });
  });
};

type WorkorderEnvConfig = {
  uri?: string;
  defaultScopes?: string[];
};

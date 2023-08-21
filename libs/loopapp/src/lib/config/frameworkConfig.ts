import { enableModelViewer } from '@cc-components/modelviewer';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
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

  const envConfig: LoopEnvConfig = c.env.config?.environment as LoopEnvConfig;

  if (!envConfig) {
    throw new Error('Failed to load environemnt config for workorder');
  }
  config.configureHttpClient('cc-api', {
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
  });
};

type LoopEnvConfig = {
  uri: string;
  defaultScopes: string[];
};

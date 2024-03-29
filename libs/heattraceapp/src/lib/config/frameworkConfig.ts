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

  const envConfig: HeattraceEnvConfig = c.env.config?.environment as HeattraceEnvConfig;

  if (!envConfig) {
    throw new Error('Failed to load environemnt config for heat trace');
  }
  config.configureHttpClient('cc-api', {
    baseUri: envConfig?.uri,
    defaultScopes: envConfig?.defaultScopes,
  });

  config.configureHttpClient('electrical-api', {
    baseUri: envConfig?.electricalUri,
    defaultScopes: envConfig?.defaultScopes,
  });

  enableAgGrid(config);
};

type HeattraceEnvConfig = {
  uri: string;
  defaultScopes: string[];
  electricalUri: string;
};

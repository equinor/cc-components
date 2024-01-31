import {
  IAppConfigurator,
  ComponentRenderArgs,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';

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
  // Add more config if needed, e.g. enableAgGrid

  const envConfig: PipingEnvConfig = c.env.config?.environment as PipingEnvConfig;

  if (!envConfig) {
    throw new Error('Failed to load environemnt config for workorder');
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

type PipingEnvConfig = {
  uri: string;
  electricalUri: string;
  defaultScopes: string[];
};

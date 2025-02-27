import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';

export const configure = async (config: IAppConfigurator, c: ComponentRenderArgs) => {
  enableNavigation(config, c.env.basename);
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
  const envConfig: ScopeChangeRequestConfig = c.env.config
    ?.environment as ScopeChangeRequestConfig;

  if (!envConfig) {
    throw new Error('Failed to load environemnt config for Scope Change Request');
  }
  config.configureHttpClient('scopechange', {
    baseUri: envConfig?.uri,
    defaultScopes: envConfig?.defaultScopes,
  });

  enableAgGrid(config);
};

type ScopeChangeRequestConfig = {
  uri: string;
  defaultScopes: string[];
};

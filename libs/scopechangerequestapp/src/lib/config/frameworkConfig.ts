import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enableBookmark } from '@equinor/fusion-framework-module-bookmark';
import { defaultModules } from '@cc-components/shared';
import { themeQuartz } from '@equinor/workspace-fusion/grid';

export const configure = async (config: IAppConfigurator, c: ComponentRenderArgs) => {
  enableNavigation(config, c.env.basename);
  enableBookmark(config);
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

  const myTheme = themeQuartz.withParams({});

  enableAgGrid(config, (b) => {
    b.setModules(defaultModules);
    b.setTheme(myTheme);
  });
};

type ScopeChangeRequestConfig = {
  uri: string;
  defaultScopes: string[];
};

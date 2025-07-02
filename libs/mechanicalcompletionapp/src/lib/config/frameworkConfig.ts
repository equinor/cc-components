import { LicenseManager } from '@ag-grid-enterprise/core';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { ModelViewerEnvConfig, enableModelViewer } from '@cc-components/modelviewer';
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
    builder.setContextType(['ProjectMaster', 'Facility']);
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

  const envConfig = c.env.config?.environment as MechEnvConfig & ModelViewerEnvConfig;

  if (envConfig.license) {
    LicenseManager.setLicenseKey(envConfig.license);
  }

  if (!envConfig.uri) {
    throw new Error('Failed to load environemnt config for MC');
  }
  config.configureHttpClient('cc-app', {
    baseUri: envConfig?.uri,
    defaultScopes: envConfig?.defaultScopes,
  });

  enableAgGrid(config);
  enableModelViewer(config, envConfig);
};

type MechEnvConfig = {
  uri: string;
  defaultScopes: string[];
  pr?: string;
  license?: string;
};

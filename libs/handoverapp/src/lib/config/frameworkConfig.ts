import { LicenseManager } from '@ag-grid-enterprise/core';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';

export const configure = async (config: IAppConfigurator, c: ComponentRenderArgs) => {
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

  const envConfig = c.env.config?.environment as HandoverEnvConfig;

  if (!envConfig.uri) {
    throw new Error('Failed to load environemnt config for workorder');
  }

  if (envConfig.license) {
    LicenseManager.setLicenseKey(envConfig.license);
  }

  config.configureHttpClient('cc-app', {
    baseUri: envConfig?.uri,
    defaultScopes: envConfig?.defaultScopes,
  });

  enableAgGrid(config);
};

type HandoverEnvConfig = {
  uri: string;
  defaultScopes: string[];
  pr?: string;
  license?: string;
};

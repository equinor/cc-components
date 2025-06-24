import { LicenseManager } from '@ag-grid-enterprise/core';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import buildQuery from 'odata-query';

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

  const envConfig: LoopEnvConfig = c.env.config?.environment as LoopEnvConfig;

  if ((window.Fusion.modules as any)?.agGrid?.licenseKey) {
    LicenseManager.setLicenseKey((window.Fusion.modules as any).agGrid.licenseKey);
  }

  if (!envConfig) {
    throw new Error('Failed to load environemnt config for workorder');
  }
  config.configureHttpClient('cc-api', {
    baseUri: envConfig?.uri,
    defaultScopes: envConfig?.defaultScopes,
  });

  enableAgGrid(config);
};

type LoopEnvConfig = {
  uri: string;
  license?: string;
  defaultScopes: string[];
};

import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-app/context';
import { enableFeatureFlagging } from '@equinor/fusion-framework-module-feature-flag';
import { createLocalStoragePlugin } from '@equinor/fusion-framework-module-feature-flag/plugins';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enablePortalMenu } from '@equinor/fusion-portal-module-menu';

import { enablePortalAppConfig, IPortal } from '@equinor/fusion-portal-module-app-config';

interface Client {
  baseUri: string;
  defaultScopes: string[];
}

interface Environment {
  portalClient: Client;
  ccApiClient: Client;
}

export const configure: AppModuleInitiator = (configurator, { env }) => {
  const { basename, config } = env;
  const environment = config?.environment as Environment | undefined;

  enableNavigation(configurator, basename);

  enableContext(configurator, (builder) => {
    builder.setContextType(['ProjectMaster']);
  });

  if (!environment) {
    throw new Error('Failed to load environment config for portal-landingpage');
  }
  enablePortalMenu(configurator);
  configurator.configureHttpClient('portal-client', environment.portalClient);

  configurator.configureHttpClient('query_api', {
    baseUri: 'https://query-api-ci.azurewebsites.net',
    defaultScopes: ['9f12661e-a8cf-4942-8fba-e304e2c16447/.default'],
  });

  configurator.configureHttpClient('cc-api', {
    baseUri: environment.ccApiClient.baseUri,
    defaultScopes: environment.ccApiClient.defaultScopes,
    // baseUri: ((): string => {
    // 	switch ('') {
    // 		case 'FPRD':
    // 			return 'https://backend-fusion-data-gateway-prod.radix.equinor.com';
    // 		default:
    // 			return 'https://backend-fusion-data-gateway-test.radix.equinor.com';
    // 	}
    // })(),
    // defaultScopes: ((): string[] => {
    // 	switch ('') {
    // 		case 'FPRD':
    // 			return ['api://5b5025d2-182d-4f10-baf9-1960a2c03733/access_as_user'];
    // 		default:
    // 			return ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'];
    // 	}
    // })(),
  });

  enablePortalAppConfig(configurator, (builder) => {
    builder.selPortalConfig(async (arg) => {
      const ref = arg.ref as { portalConfig?: { current: IPortal } };
      if (ref.portalConfig) {
        return ref.portalConfig.current.portalAppConfig;
      } else {
        return { id: 'cli', contextTypes: [{ type: 'ProjectMaster' }], env: 'ci' };
      }
    });
  });

  enableFeatureFlagging(configurator, (builder) => {
    builder.addPlugin(
      createLocalStoragePlugin([
        {
          key: 'cc-tab',
          title: 'New Construction and Commissioning Tab',
          description:
            'When enabled you will be able to tryout the new CC tab on project page',
        },
        {
          key: 'app-search',
          title: 'New App Search',
          description:
            'When enabled you will be able to tryout the application search on project page',
        },
        {
          key: 'project-milestones',
          title: 'Project Milestones',
          description:
            'When enabled you will see the project milestones on the project landing page',
          enabled: true,
        },
      ])
    );
  });
};

export default configure;

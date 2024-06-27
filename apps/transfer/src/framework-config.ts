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

  config.configureHttpClient('cc-app', {
    baseUri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
    defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user']
  });

  config.configureHttpClient('fam-api', {
    baseUri: "https://famapi.equinor.com",
    defaultScopes: ["api://958bef40-48c3-496e-bc0b-0fe5783f196b/access_as_user"],
  });

};


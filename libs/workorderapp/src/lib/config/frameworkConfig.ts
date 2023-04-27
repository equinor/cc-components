import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';

const ccApp = {
  uri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
  defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'],
};

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

  // c.env.config?.environment[]
  console.log(c.env.config?.environment);

  config.configureHttpClient('cc-app', {
    baseUri: ccApp.uri,
    defaultScopes: ccApp.defaultScopes,
  });
  enableAgGrid(config);
};

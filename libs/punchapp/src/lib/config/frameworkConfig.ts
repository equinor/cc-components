import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { IAppConfigurator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';

const ccApi = {
  uri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
  defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'],
};

export const configure = async (config: IAppConfigurator) => {
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
  config.configureHttpClient('cc-api', {
    baseUri: ccApi.uri,
    defaultScopes: ccApi.defaultScopes,
  });
  enableAgGrid(config);
};

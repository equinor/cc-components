import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { IAppConfigurator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';

const ccApi = {
  uri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
  defaultScopes: ['api://2225e001-b04f-43ea-ac12-6fc3bbcf3a12/user_impersonation'],
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

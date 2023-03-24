import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { IAppConfigurator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';

const dataProxy = {
  clientId: '5a842df8-3238-415d-b168-9f16a6a6031b',
  uri: 'https://pro-s-dataproxy-CI.azurewebsites.net',
  defaultScopes: ['5a842df8-3238-415d-b168-9f16a6a6031b/.default'],
};
const ccApp = {
  clientId: '2225e001-b04f-43ea-ac12-6fc3bbcf3a12',
  uri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
  uri2: 'https://localhost:7074',
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
  config.configureHttpClient('data-proxy', {
    baseUri: dataProxy.uri,
    defaultScopes: dataProxy.defaultScopes,
  });
  config.configureHttpClient('cc-api', {
    baseUri: ccApp.uri2,
    defaultScopes: ccApp.defaultScopes,
  });
  enableAgGrid(config);
};

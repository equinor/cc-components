import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { IAppConfigurator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';

const dataProxy = {
  uri: 'https://app-ppo-scope-change-control-api-dev.azurewebsites.net',
  defaultScopes: ['api://df71f5b5-f034-4833-973f-a36c2d5f9e31/Files.readwrite'],
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
  config.configureHttpClient('scopechange', {
    baseUri: dataProxy.uri,
    defaultScopes: dataProxy.defaultScopes,
  });
  enableAgGrid(config);
};

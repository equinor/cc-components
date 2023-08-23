import { IAppConfigurator } from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';
import { enableModelViewer } from '@cc-components/modelviewer';

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
  enableModelViewer(config, (builder) => {
    builder.setHierarchyClientConfig({
      baseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net',
      scope: 'ebc04930-bf9c-43e5-98bc-bc90865600b8/user_impersonation',
    });
    builder.setModelClientConfig({
      baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
      scope: 'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
    });
  });
};

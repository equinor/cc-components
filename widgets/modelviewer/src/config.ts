import { WidgetModuleInitiator } from '@equinor/fusion-framework-react-widget';

import { enableModelViewer } from '@cc-components/modelviewer';

export const configure: WidgetModuleInitiator = (config, env) => {
  enableModelViewer(config, (builder) => {
    builder.setHierarchyClientConfig({
      baseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net',
      scope: 'ebc04930-bf9c-43e5-98bc-bc90865600b8/user_impersonation',
    });
    builder.setModelClientConfig({
      baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
      scope: 'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
    });
    builder.setEchoClientConfig({
      baseUrl: 'https://dt-echopedia-api-dev.azurewebsites.net',
      scope: 'aef35d97-53d4-4fd0-adaf-c5a514b38436/user_impersonation',
    });
  });
};

export default configure;

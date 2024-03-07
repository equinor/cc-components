import { WidgetModuleInitiator } from '@equinor/fusion-framework-react-widget';

import { enableModelViewer } from '@cc-components/modelviewer';

export const configure: WidgetModuleInitiator = (config, env) => {
  enableModelViewer(config, (builder) => {
    builder.setHierarchyClientConfig({
      baseUrl: env.props!['hierarchyClientBaseUrl'] as string,
      scope: env.props!['hierarchyClientScope'] as string,
    });
    builder.setModelClientConfig({
      baseUrl: env.props!['modelClientBaseUrl'] as string,
      scope: env.props!['modelClientScope'] as string,
    });
    builder.setEchoClientConfig({
      baseUrl: env.props!['echoClientBaseUrl'] as string,
      scope: env.props!['echoClientScope'] as string,
    });
  });
};

export default configure;

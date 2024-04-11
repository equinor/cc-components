import { IAppConfigurator } from '@equinor/fusion-framework-react-app';

import { ModelViewerEnvConfig } from '..';

export const enableModelViewer = (
  configurator: IAppConfigurator,
  config: ModelViewerEnvConfig
) => {
  configurator.configureHttpClient('echo', {
    baseUri: config.modelViewerConfig.echoClientBaseUrl,
    defaultScopes: [config.modelViewerConfig.echoClientScope],
  });
};

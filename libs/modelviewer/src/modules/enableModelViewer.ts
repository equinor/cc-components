import { type IModulesConfigurator } from '@equinor/fusion-framework-module';
import module from './module';
import { ModelViewerConfigurator } from './configurator';
import { ModelViewerEnvConfig } from '..';

export const enableModelViewerWithBuilder = (
  configurator: IModulesConfigurator<any, any>,
  configure: (builder: ModelViewerConfigurator) => void
) => {
  configurator.addConfig({
    module,
    configure,
  });
};

export const enableModelViewer = (
  configurator: IModulesConfigurator<any, any>,
  config: ModelViewerEnvConfig
) => {
  configurator.addConfig({
    module,
    configure: (builder) => {
      builder.setHierarchyClientConfig({
        baseUrl: config.modelViewerConfig.hierarchyClientBaseUrl,
        scope: config.modelViewerConfig.hierarchyClientScope,
      });
      builder.setModelClientConfig({
        baseUrl: config.modelViewerConfig.modelClientBaseUrl,
        scope: config.modelViewerConfig.modelClientScope,
      });
      builder.setEchoClientConfig({
        baseUrl: config.modelViewerConfig.echoClientBaseUrl,
        scope: config.modelViewerConfig.echoClientScope,
      });
    },
  });
};
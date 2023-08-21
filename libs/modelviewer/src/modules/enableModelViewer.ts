import { type IModulesConfigurator } from '@equinor/fusion-framework-module';
import module from './module';
import { ModelViewerConfigurator } from './configurator';

export const enableModelViewer = (
  configurator: IModulesConfigurator<any, any>,
  configure: (builder: ModelViewerConfigurator) => void
) => {
  configurator.addConfig({
    module,
    configure,
  });
};

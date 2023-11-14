import { type Module } from '@equinor/fusion-framework-module';
import { ModelViewerConfigurator } from './configurator';
import { ModuleViewerProvider, IModuleViewerProvider } from './provider';

type ModuleViewerKey = 'moduleViewer';

export const moduleKey: ModuleViewerKey = 'moduleViewer';

export type ModuleViewer = Module<
  ModuleViewerKey,
  IModuleViewerProvider,
  ModelViewerConfigurator
>;

export const module: ModuleViewer = {
  name: moduleKey,
  configure: () => new ModelViewerConfigurator(),
  initialize: async (init) => {
    const config = await (init.config as ModelViewerConfigurator).createConfigAsync(init);
    return new ModuleViewerProvider(config);
  },
};

export default module;

declare module '@equinor/fusion-framework-module' {
  interface Modules {
    moduleViewer: ModuleViewer;
  }
}

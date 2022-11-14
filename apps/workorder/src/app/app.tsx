import { AppModuleInitiator } from '@equinor/fusion-framework-app';
import { createComponent, renderComponent } from '@equinor/fusion-framework-react-app';
import { module as serviceModule } from '@equinor/fusion-framework-module-services';
const configure: AppModuleInitiator = async (config) => {
  config.useFrameworkServiceClient('portal');
  config.addConfig({
    module: serviceModule,
  });
};
export const render = renderComponent((el, args) => {
  const componentRenderer = createComponent(() => <div></div>, configure);

  return componentRenderer(el, args);
});

export default render;

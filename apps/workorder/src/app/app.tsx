import { AppModuleInitiator } from '@equinor/fusion-framework-app';
import {
  createComponent,
  renderComponent,
  useAppModule,
  useAppModules,
} from '@equinor/fusion-framework-react-app';
import { module as serviceModule } from '@equinor/fusion-framework-module-services';
import { Workspace } from '@cc-components/workorderapp';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const dataProxy = {
  clientId: '5a842df8-3238-415d-b168-9f16a6a6031b',
  uri: 'https://pro-s-dataproxy-CI.azurewebsites.net',
  defaultScopes: ['5a842df8-3238-415d-b168-9f16a6a6031b/.default'],
};
const configure: AppModuleInitiator = async (config) => {
  config.configureHttpClient('data-proxy', {
    baseUri: dataProxy.uri,
    defaultScopes: dataProxy.defaultScopes,
  });
  // config.configureHttpClient('FAM', {
  //   baseUri: 'https://famapi.equinor.com',
  //   defaultScopes: [
  //     'api://922fbdee-795d-4733-b4ab-e1cc8bf85e8c/default',
  //     'api://958bef40-48c3-496e-bc0b-0fe5783f196b/access_as_user',
  //   ],
  // });
  // config.onInitialized((f) => console.log(f));
  // config.useFrameworkServiceClient('portal');
  // config.addConfig({
  //   module: serviceModule,
  // });
};
export const render = renderComponent((el, args) => {
  const componentRenderer = createComponent(() => {
    const a = useHttpClient('data-proxy');
    const WorkspaceComponent = Workspace(a);

    return (
      <div style={{ height: '90vh', width: '90vw' }}>
        <WorkspaceComponent />
      </div>
    );
  }, configure);

  return componentRenderer(el, args);
});

export default render;

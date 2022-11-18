import {
  ComponentRenderArgs,
  IAppConfigurator,
  makeComponent,
} from '@equinor/fusion-framework-react-app';
import { enableAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WorkspaceWrapper } from '@cc-components/mechanicalcompletionapp';
const dataProxy = {
  clientId: '5a842df8-3238-415d-b168-9f16a6a6031b',
  uri: 'https://pro-s-dataproxy-CI.azurewebsites.net',
  defaultScopes: ['5a842df8-3238-415d-b168-9f16a6a6031b/.default'],
};

const configure = async (config: IAppConfigurator) => {
  config.configureHttpClient('data-proxy', {
    baseUri: dataProxy.uri,
    defaultScopes: dataProxy.defaultScopes,
  });
  enableAgGrid(config);
};

const MyApp = () => {
  return (
    <StrictMode>
      <div style={{ height: '90vh', width: '90vw' }}>
        <WorkspaceWrapper />
      </div>
    </StrictMode>
  );
};

export default function render(el: HTMLElement, args: ComponentRenderArgs) {
  /** Create root from provided element */
  const root = createRoot(el);

  /** Make the app component
   * First argument is the main React component
   * Second argu is the the render args (framework and env variables)
   * Third argument is the configuration callback
   */
  const AppComponent = makeComponent(<MyApp />, args, configure);

  root.render(<AppComponent />);

  /** Teardown */
  return () => root.unmount();
}

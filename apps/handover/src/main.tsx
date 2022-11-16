import { createWorkspace } from '@cc-components/handoverapp';
import { createComponent, renderComponent } from '@equinor/fusion-framework-react-app';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useMemo } from 'react';
const dataProxy = {
  clientId: '5a842df8-3238-415d-b168-9f16a6a6031b',
  uri: 'https://pro-s-dataproxy-CI.azurewebsites.net',
  defaultScopes: ['5a842df8-3238-415d-b168-9f16a6a6031b/.default'],
};
const configure = async (config: any) => {
  config.configureHttpClient('data-proxy', {
    baseUri: dataProxy.uri,
    defaultScopes: dataProxy.defaultScopes,
  });
};
export const render = renderComponent((el, args) => {
  const componentRenderer = createComponent(() => {
    const dataProxy = useHttpClient('data-proxy');
    const Workspace = useMemo(() => createWorkspace(dataProxy), [dataProxy]);

    return (
      <div style={{ height: '90vh', width: '90vw' }}>
        <Workspace />
      </div>
    );
  }, configure);

  return componentRenderer(el, args);
});

export default render;

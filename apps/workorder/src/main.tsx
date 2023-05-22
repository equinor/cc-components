import { configure, WorkspaceWrapper } from '@cc-components/workorderapp';
import { ComponentRenderArgs, makeComponent } from '@equinor/fusion-framework-react-app';
import { createRoot } from 'react-dom/client';
import { RootAppWrapper, useContextId } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const WorkorderApp = () => {
  const client = useHttpClient('cc-app');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
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
  const AppComponent = makeComponent(<WorkorderApp />, args, configure);

  root.render(<AppComponent />);

  /** Teardown */
  return () => root.unmount();
}

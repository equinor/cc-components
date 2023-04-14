import { configure, WorkspaceWrapper } from '@cc-components/workorderapp';
import { ComponentRenderArgs, makeComponent } from '@equinor/fusion-framework-react-app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContextId } from '@cc-components/shared';
import { NoContext } from '@cc-components/shared';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const WorkorderApp = () => {
  const contextId = useContextId();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
          {contextId ? <WorkspaceWrapper contextId={contextId} /> : <NoContext />}
        </div>
      </QueryClientProvider>
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
  const AppComponent = makeComponent(<WorkorderApp />, args, configure);

  root.render(<AppComponent />);

  /** Teardown */
  return () => root.unmount();
}

import { ComponentRenderArgs, makeComponent } from '@equinor/fusion-framework-react-app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContextId } from '@cc-components/shared/hooks';
import { NoContext } from '@cc-components/shared/common';
import { Report, configure } from '@cc-components/powerbi';

const queryClient = new QueryClient();

const MyApp = () => {
  const contextId = useContextId();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
          {contextId ? (
            <Report
              appKey={'preservationanalytics'}
              column={'ProjectMaster GUID'}
              reportId={'cc-preservation-analytics'}
              table={'Dim_ProjectMaster'}
              contextId={contextId}
            />
          ) : (
            <NoContext />
          )}
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
  const AppComponent = makeComponent(<MyApp />, args, configure);

  root.render(<AppComponent />);

  /** Teardown */
  return () => root.unmount();
}

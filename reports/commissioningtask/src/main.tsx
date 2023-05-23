import { ComponentRenderArgs, makeComponent } from '@equinor/fusion-framework-react-app';
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { useContextId } from '@cc-components/shared/hooks';
import { RootAppWrapper } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const MyApp = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'commissioningtask'}
        column={'ProjectMaster GUID'}
        reportId={'commissioning-task'}
        table={'Dim_ProjectMaster'}
      />
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
  const AppComponent = makeComponent(<MyApp />, args, configure);

  root.render(<AppComponent />);

  /** Teardown */
  return () => root.unmount();
}

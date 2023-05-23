import { ComponentRenderArgs, makeComponent } from '@equinor/fusion-framework-react-app';
import { createRoot } from 'react-dom/client';
import { RootAppWrapper } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const MyApp = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'jcaspools'}
        column={'ProjectMaster GUID'}
        reportId={'pp-spools-analytics'}
        //Dim_ProjectMaster does not exist in Report. data will show up for all projects if app is visible for project and user have access
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

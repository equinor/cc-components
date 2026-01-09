import {
  IAppConfigurator,
  ComponentRenderArgs,
  makeComponent,
  AppModules,
} from '@equinor/fusion-framework-react-app';
import { createRoot } from 'react-dom/client';

/**
 * Facades the fusion-framework render setup, used in all apps
 * @param Comp Your app React.FC
 * @param configure Configure framework callback
 * @returns default export for app bundle
 */
export function createRender(
  Comp: React.FC,
  configure: (config: IAppConfigurator<AppModules>, c: ComponentRenderArgs) => Promise<void>
) {
  return (el: HTMLElement, args: ComponentRenderArgs) => {
    /** Create root from provided element */
    const root = createRoot(el);

    /** Make the app component
     * First argument is the main React component
     * Second argu is the the render args (framework and env variables)
     * Third argument is the configuration callback
     */
    const AppComponent = makeComponent(<Comp />, args, configure);

    root.render(<AppComponent />);

    /** Teardown */
    return () => {
      root.unmount();
    };
  };
}

import {
  IAppConfigurator,
  ComponentRenderArgs,
  makeComponent,
} from '@equinor/fusion-framework-react-app';
import { createRoot } from 'react-dom/client';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

/**
 * Facades the fusion-framework render setup, used in all apps
 * @param Comp Your app React.FC
 * @param configure Configure framework callback
 * @returns default export for app bundle
 */
export function createRender(
  Comp: React.FC,
  configure: (config: IAppConfigurator, c: ComponentRenderArgs) => Promise<void>
) {
  return (el: HTMLElement, args: ComponentRenderArgs) => {
    const connectionString = (args.env.config?.environment as { ai?: string })?.ai;

    const teardown = (() => {
      if (connectionString) {
        console.log('application insights enabled');
        const appInsights = new ApplicationInsights({
          config: {
            connectionString: connectionString,
            enableResponseHeaderTracking: true,
            enableDebug: true,
            appId: 'workorder',
          },
        });
        appInsights.loadAppInsights();
        appInsights.trackPageView();
        Object.assign(window, { ai: appInsights });
        return () => {
          console.log('Removing application insights');
          appInsights.unload();
        };
      }
    })();

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
      teardown && teardown();
      root.unmount();
    };
  };
}

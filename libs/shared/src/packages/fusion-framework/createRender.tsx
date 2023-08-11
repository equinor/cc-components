import {
  IAppConfigurator,
  ComponentRenderArgs,
  makeComponent,
} from '@equinor/fusion-framework-react-app';
import { createRoot } from 'react-dom/client';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useState } from 'react';
import { Button } from '@equinor/eds-core-react';

/**
 * Facades the fusion-framework render setup, used in all apps
 * @param Comp Your app React.FC
 * @param configure Configure framework callback
 * @returns default export for app bundle
 */
export function createRender(
  Comp: React.FC,
  configure: (config: IAppConfigurator, c: ComponentRenderArgs) => Promise<void>,
  appName: string = 'unknown'
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
          },
        });
        appInsights.loadAppInsights();
        appInsights.trackPageView();
        appInsights.addTelemetryInitializer((envelope) => {
          (envelope.tags as any)['ai.cloud.role'] = appName;
          (envelope.tags as any)['ai.cloud.roleInstance'] = appName;
        });
        Object.assign(window, { ai: appInsights });
        return () => {
          console.log('Removing application insights');
          appInsights.unload();
        };
      }
    })();

    const possiblePrNumber = (args.env.config?.environment as any)?.pr;

    if (possiblePrNumber) {
      console.log(`creating pr ${possiblePrNumber}`);
      createPrLabel(possiblePrNumber, el);
    }

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

function createPrLabel(prNumber: string, el: HTMLElement): VoidFunction {
  const child = document.createElement('div');
  child.id = '123';
  document.body.appendChild(child);

  const root = createRoot(child);

  root.render(<PRLabel prNumber={prNumber} />);

  return () => {
    root.unmount();
    child.remove();
  };
}

function PRLabel({ prNumber }: { prNumber: string }) {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: '48px',
        right: `${Math.round(window.innerWidth / 2)}px`,
        fontSize: '24px',
        border: '1px solid grey',
        background: 'orange',
        padding: '10px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <a href={`https://github.com/equinor/cc-components/pull/${prNumber}`}>
        PR: #{prNumber}
      </a>
      <Button variant="ghost_icon" onClick={() => setIsOpen(false)}>
        X
      </Button>
    </div>
  );
}

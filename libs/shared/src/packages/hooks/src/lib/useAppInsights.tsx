import React, { createContext, useContext, useEffect } from 'react';
import {
  ApplicationInsights,
  BaseTelemetryPlugin,
  IAppInsightsCore,
  IConfiguration,
  IPlugin,
  IProcessTelemetryContext,
  ITelemetryItem,
} from '@microsoft/applicationinsights-web';
import { table } from 'console';
import { context } from 'node_modules/@equinor/fusion-framework-react/dist/types/context';

const AppInsightsContext = createContext<ApplicationInsights | undefined>(undefined);

class TestPlugin extends BaseTelemetryPlugin {
  private defaultProperties: Record<string, string> | undefined;
  constructor(defaultProperties?: Record<string, string>) {
    super();
    this.defaultProperties = defaultProperties;
  }

  public processTelemetry(env: ITelemetryItem, itemCtx?: IProcessTelemetryContext) {
    env.baseData = {
      ...env.baseData,
      properties: {
        ...env.baseData?.properties,
        ...this.defaultProperties,
        contextTitle: (window as any).Fusion?.modules?.context?.currentContext?.title,
        contextId: (window as any).Fusion?.modules?.context?.currentContext?.id,
        contextType: (window as any).Fusion?.modules?.context?.currentContext?.type?.id,
      },
      tags: {
        ...env.baseData?.tags,
        ['ai.cloud.role']: this.defaultProperties?.appKey,
        ['ai.cloud.roleInstance']: this.defaultProperties?.build,
      },
    };

    return itemCtx?.processNext(env);
  }
}

export const useAppInsights = (): ApplicationInsights | undefined => {
  return useContext(AppInsightsContext);
};

type AppInsightsProviderProps = {
  connectionString: string;
  children: React.ReactNode;
  defaultTags?: Record<string, string>;
};

export const AppInsightsProvider = ({
  connectionString,
  children,
  defaultTags,
}: AppInsightsProviderProps): JSX.Element => {
  const appInsights = new ApplicationInsights({
    config: {
      connectionString: connectionString,
      enableResponseHeaderTracking: true,
      enableAjaxPerfTracking: true,
      extensions: [new TestPlugin(defaultTags)],
    },
  });

  useEffect(() => {
    appInsights.loadAppInsights();
    appInsights.trackPageView();

    appInsights.trackEvent({ name: `[App loaded]: ${defaultTags?.appKey}` });

    Object.assign(window, { ai: appInsights });

    return () => {
      appInsights.unload();
    };
  }, [appInsights]);

  return (
    <AppInsightsContext.Provider value={appInsights}>
      {children}
    </AppInsightsContext.Provider>
  );
};

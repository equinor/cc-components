import React, { createContext, ReactElement, useContext, useEffect } from 'react';
import {
  ApplicationInsights,
  BaseTelemetryPlugin,
  IProcessTelemetryContext,
  ITelemetryItem,
} from '@microsoft/applicationinsights-web';

const AppInsightsContext = createContext<ApplicationInsights | undefined>(undefined);

class ExtendMetadataPlugin extends BaseTelemetryPlugin {
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

const filterUnwantedLogs = (envelope: ITelemetryItem): boolean => {
  const message = envelope.baseData?.message || envelope.baseData?.properties?.message;
  // Filters out unwanted logs from Fusion
  if (message?.includes('ResizeObserver')) {
    return false;
  }

  return true;
};

type AppInsightsProviderProps = {
  connectionString?: string;
  children: React.ReactNode;
  defaultTags?: Record<string, string>;
};

export const AppInsightsProvider = ({
  connectionString,
  children,
  defaultTags,
}: AppInsightsProviderProps): ReactElement => {
  let appInsights: ApplicationInsights | undefined = undefined;

  if (connectionString) {
    appInsights = new ApplicationInsights({
      config: {
        connectionString: connectionString,
        enableResponseHeaderTracking: true,
        enableAjaxPerfTracking: true,
        extensions: [new ExtendMetadataPlugin(defaultTags)],
      },
    });
    appInsights.addTelemetryInitializer(filterUnwantedLogs);
  }

  useEffect(() => {
    appInsights?.loadAppInsights();
    appInsights?.trackPageView();

    appInsights?.trackEvent({ name: `[App loaded]: ${defaultTags?.appKey}` });

    Object.assign(window, { ai: appInsights });

    return () => {
      appInsights?.unload();
    };
  }, [appInsights]);

  return (
    <AppInsightsContext.Provider value={appInsights}>
      {children}
    </AppInsightsContext.Provider>
  );
};

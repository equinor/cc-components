import { useFramework } from '@equinor/fusion-framework-react';
import { useFrameworkHttpClient } from '@equinor/fusion-framework-react/http';

type IHttpClient = ReturnType<typeof useFrameworkHttpClient>;

type ServiceDiscoTypes =
  | 'app-proxy'
  | 'pre-auth-proxy'
  | 'people'
  | 'org'
  | 'data-proxy'
  | 'powerbi'
  | 'tasks'
  | 'notification'
  | 'meeting-v2'
  | 'projects'
  | 'portal'
  | 'omnia-ssu'
  | 'omnia-spend'
  | 'persistent-cache'
  | 'mail'
  | 'commonlib'
  | 'reports'
  | 'query'
  | 'context'
  | 'roles'
  | 'fusion-tasks'
  | 'line-org'
  | 'info-app'
  | 'az-function-utility'
  | 'meeting'
  | 'az-function-common'
  | 'commonlib-api'
  | 'omnia'
  | 'az-function-signalr-notification'
  | 'bookmarks'
  | 'external-personnel'
  | 'contract-personnel'
  | 'apps';

type IServiceDisco = {
  createClient: (type: ServiceDiscoTypes) => Promise<IHttpClient>;
};

export const useServiceDiscovery = (): IServiceDisco => {
  try {
    const serviceDisovery = useFramework().modules.serviceDiscovery;
    return serviceDisovery;
  } catch {
    throw new Error('useFramework has to called in the scope of Fusion framework.');
  }
};

import { useFramework } from '@equinor/fusion-framework-react';
import type { IHttpClient } from '@equinor/fusion-framework-react/http';

type ServiceDiscoTypes = 'reports';

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

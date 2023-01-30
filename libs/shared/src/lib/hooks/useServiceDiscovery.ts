import { useFramework } from '@equinor/fusion-framework-react';
import { type IServiceDiscoveryProvider } from '@equinor/fusion-framework-module-service-discovery';
export const useServiceDiscovery = (): IServiceDiscoveryProvider => {
  try {
    const serviceDisovery = useFramework().modules.serviceDiscovery;
    return serviceDisovery;
  } catch {
    throw new Error('useFramework has to called in the scope of Fusion framework.');
  }
};

import { useFramework } from '@equinor/fusion-framework-react';
export const useServiceDiscovery = () => {
  try {
    const serviceDisovery = useFramework().modules.serviceDiscovery;
    return serviceDisovery;
  } catch {
    throw new Error('useFramework has to called in the scope of Fusion framework.');
  }
};

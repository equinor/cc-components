import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';

export function useFusionContext() {
  return useModuleCurrentContext().currentContext;
}

import { ContextProvider as FusionContextProvider } from '@equinor/fusion-react-context-selector';
import { ReactNode } from 'react';
import { useContextResolver } from '../hooks/use-context-resolver';

interface PortalContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: PortalContextProviderProps) => {
  const resolver = useContextResolver(['ProjectMaster', 'Facility']);

  return <FusionContextProvider resolver={resolver}>{children}</FusionContextProvider>;
};

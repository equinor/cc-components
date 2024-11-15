import { ContextProvider as FusionContextProvider } from '@equinor/fusion-react-context-selector';
import { usePortalContextTypes } from '@equinor/fusion-portal-react-app';
import { ReactNode } from 'react';
import { useContextResolver } from '../hooks/use-context-resolver';

interface PortalContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: PortalContextProviderProps) => {
  const contextTypes = usePortalContextTypes();
  const resolver = useContextResolver(contextTypes);

  return <FusionContextProvider resolver={resolver}>{children}</FusionContextProvider>;
};

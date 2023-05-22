import { PropsWithChildren } from 'react';
import { NoContext } from '../../common';
import { useContextId } from '../../hooks';

/**
 * Component to ensure a context has been set.
 */
export const ContextGuard = ({ children }: PropsWithChildren) => {
  const contextId = useContextId();
  if (!contextId) return <NoContext />;
  return <>{children}</>;
};

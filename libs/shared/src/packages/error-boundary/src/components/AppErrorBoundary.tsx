// @ts-nocheck
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useExternalContextId } from '../../../hooks';
import { CCApiUnauthorizedError } from '../classes/CCApiUnauthorizedError';
import { CCApiUnauthorized } from './errors/CCApiUnauthorized';
import { FDataProxyUnauthorized } from './errors/FDataProxyUnauthorized';
import { FusionDataProxyUnauthorized } from '../classes/FusionDataProxyUnauthorized';
import { NoSelectedContextError } from '../classes/NoSelectedContextError';
import { NoContext } from '../../../common';
import { UnknownError } from './errors/UnknownError';

export type AppErrorBoundaryProps = {
  children: ReactNode;
  resetKeys?: string[];
};
export function AppErrorBoundary({ children, resetKeys = [] }: AppErrorBoundaryProps) {
  const contextId = useExternalContextId();

  if (!contextId) return <NoContext />;

  return (
    <ErrorBoundary
      resetKeys={[contextId, ...resetKeys]}
      FallbackComponent={(props) => {
        if (props.error instanceof CCApiUnauthorizedError) {
          return <CCApiUnauthorized />;
        }

        if (props.error instanceof FusionDataProxyUnauthorized) {
          return <FDataProxyUnauthorized error={props.error.error} />;
        }

        if (props.error instanceof NoSelectedContextError) {
          return <NoContext />;
        }

        return <UnknownError error={props.error} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

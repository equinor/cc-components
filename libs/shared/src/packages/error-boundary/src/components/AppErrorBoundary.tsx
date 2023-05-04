import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useContextId } from '../../../hooks';
import { CCApiUnauthorizedError } from '../classes/CCApiUnauthorizedError';
import { CCApiUnauthorized } from './errors/CCApiUnauthorized';
import { FDataProxyUnauthorized } from './errors/FDataProxyUnauthorized';
import { FusionDataProxyUnauthorized } from '../classes/FusionDataProxyUnauthorized';

export type AppErrorBoundaryProps = {
  children: ReactNode;
  resetKeys?: string[];
};
export function AppErrorBoundary({ children, resetKeys = [] }: AppErrorBoundaryProps) {
  const contextId = useContextId();

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
        return <div>unknown error</div>;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

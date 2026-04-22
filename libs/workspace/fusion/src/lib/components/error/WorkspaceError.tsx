import { Button } from '@equinor/eds-core-react';
import { FallbackProps } from 'react-error-boundary';

export const WorkspaceError = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  return (
    <div>
      <div>
        An unknown error has occurred in the workspace
        <div>{message}</div>
        <pre>{stack}</pre>
      </div>
      <Button
        onClick={() => {
          resetErrorBoundary();
        }}
      >
        Try again
      </Button>
    </div>
  );
};

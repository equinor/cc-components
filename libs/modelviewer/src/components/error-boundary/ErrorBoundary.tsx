import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ErrorMessage } from './ErrorMessage';
import { AccessError } from '../../types/errors';
import { AccessErrorMessage } from './AccessErrorMessage';

type ModelViewerErrorBoundaryProps = {
  children?: ReactNode;
  resetKeys: any[];
  FallbackComponent?: React.ComponentType<FallbackProps>;
};

export const ModelViewerErrorBoundary = (
  props: ModelViewerErrorBoundaryProps
): JSX.Element => {
  const { children, resetKeys, FallbackComponent } = props;

  const fallback = (fallbackProps: FallbackProps) => {
    const { error } = fallbackProps;
    if (FallbackComponent) return <FallbackComponent {...fallbackProps} />;

    if (error instanceof AccessError) {
      return <AccessErrorMessage error={error} />;
    }

    if (error instanceof Error) {
      return <ErrorMessage title={error.name} message={error.message} />;
    }

    return (
      <ErrorMessage
        title="Unknown error"
        message="The ModelViewer encountered an unknown error"
      />
    );
  };

  return (
    <ErrorBoundary resetKeys={resetKeys} FallbackComponent={fallback}>
      {children}
    </ErrorBoundary>
  );
};

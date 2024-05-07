import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ErrorMessage } from './ErrorMessage';
import { CustomError } from '../../types/errors';
import { CustomErrorMessage } from './CustomErrorMessage';

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

    if (error instanceof CustomError) {
      return <CustomErrorMessage error={error} />;
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

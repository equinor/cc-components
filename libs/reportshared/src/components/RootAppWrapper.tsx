import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { StyledDefaultLayout } from './StyledDefaultLayout';
import { useFusionContext } from '../hooks/useContext';
import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

const queryClient = new QueryClient();
export const RootAppWrapper = ({ children }: PropsWithChildren) => {
  const context = useFusionContext();

  if (!context) {
    return (
      <StyledNoContext>
        <Typography variant="h1">Please select a context</Typography>
      </StyledNoContext>
    );
  }

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          resetKeys={[context?.id]}
          FallbackComponent={() => <div>Report crashed</div>}
        >
          <StyledDefaultLayout>{children}</StyledDefaultLayout>
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};

const StyledNoContext = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

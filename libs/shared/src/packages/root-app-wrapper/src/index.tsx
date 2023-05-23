import { PropsWithChildren, StrictMode } from 'react';
import { ClientProvider } from './ClientProvider';
import { IHttpClient } from '@equinor/fusion-framework-react-app/http';
import { AppErrorBoundary } from '../../error-boundary';
import { StyledDefaultLayout } from './DefaultLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export const RootAppWrapper = ({
  children,
  client,
}: PropsWithChildren<{ client: IHttpClient | null }>) => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppErrorBoundary>
          <ClientProvider client={client}>
            <StyledDefaultLayout>{children}</StyledDefaultLayout>
          </ClientProvider>
        </AppErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};

export { useHttpClient } from './ClientProvider';

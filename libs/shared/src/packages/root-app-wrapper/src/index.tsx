import { PropsWithChildren, StrictMode } from 'react';
import { ClientProvider } from './ClientProvider';
import { AppErrorBoundary } from '../../error-boundary';
import { StyledDefaultLayout } from './DefaultLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type IHttpClient } from '@equinor/fusion-framework-module-http';

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

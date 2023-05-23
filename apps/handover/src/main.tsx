import { configure, WorkspaceWrapper } from '@cc-components/handoverapp';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContextId } from '@cc-components/shared/hooks';
import { NoContext } from '@cc-components/shared/common';
import { AppErrorBoundary, createRender } from '@cc-components/shared';

const queryClient = new QueryClient();

const HandoverApp = () => {
  const contextId = useContextId();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppErrorBoundary>
          <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            {contextId ? <WorkspaceWrapper contextId={contextId} /> : <NoContext />}
          </div>
        </AppErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};

export const render = createRender(HandoverApp, configure);
export default render;

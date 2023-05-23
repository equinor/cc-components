import { configure, WorkspaceWrapper } from '@cc-components/scopechangerequestapp';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NoContext } from '@cc-components/shared/common';
import { createRender } from '@cc-components/shared';
import { useContextId } from '@cc-components/shared/hooks';

const queryClient = new QueryClient();

const MyApp = () => {
  const contextId = useContextId();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
          {contextId ? <WorkspaceWrapper contextId={contextId} /> : <NoContext />}
        </div>
      </QueryClientProvider>
    </StrictMode>
  );
};

export const render = createRender(MyApp, configure);
export default render;

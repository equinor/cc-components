import { configure } from '@cc-components/modelviewerapp';
import { FusionModelViewer } from '@cc-components/modelviewer';
import { createRender } from '@cc-components/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FusionModelViewer plantCode="jca" />
    </QueryClientProvider>
  );
};

export const render = createRender(App, configure);
export default render;

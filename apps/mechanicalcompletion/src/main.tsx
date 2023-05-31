import { configure, WorkspaceWrapper } from '@cc-components/mechanicalcompletionapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const McApp = () => {
  const client = useHttpClient('data-proxy');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(McApp, configure, 'Mechanical completion');
export default render;

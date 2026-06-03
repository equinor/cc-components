import { configure, WorkspaceWrapper } from '@cc-components/mechanicalcompletion';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const McApp = () => {
  const client = useHttpClient('cc-app');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(McApp, configure, 'mechanical-completion');
export default render;

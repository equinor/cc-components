import { configure, WorkspaceWrapper } from '@cc-components/pipingapp';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { createRender, RootAppWrapper } from '@cc-components/shared';

const PipingApp = () => {
  const client = useHttpClient('cc-api');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(PipingApp, configure, 'Piping');
export default render;

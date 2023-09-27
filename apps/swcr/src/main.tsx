import { configure, WorkspaceWrapper } from '@cc-components/swcrapp';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { createRender, RootAppWrapper } from '@cc-components/shared';

const SwcrApp = () => {
  const client = useHttpClient('cc-api');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(SwcrApp, configure, 'SWCR');

export default render;

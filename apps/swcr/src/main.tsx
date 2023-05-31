import { configure, WorkspaceWrapper } from '@cc-components/swcrapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const SwcrApp = () => {
  return (
    <RootAppWrapper client={useHttpClient('data-proxy')}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(SwcrApp, configure, 'SWCR');
export default render;

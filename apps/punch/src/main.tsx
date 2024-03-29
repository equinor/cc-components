import { configure, WorkspaceWrapper } from '@cc-components/punchapp';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { createRender, RootAppWrapper } from '@cc-components/shared';

const PunchApp = () => {
  const client = useHttpClient('cc-api');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(PunchApp, configure, 'Punch');

export default render;

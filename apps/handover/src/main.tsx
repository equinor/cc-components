import { configure, WorkspaceWrapper } from '@cc-components/handoverapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const HandoverApp = () => {
  const client = useHttpClient('cc-app');
  return (
    <RootAppWrapper client={client}>

      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(HandoverApp, configure, 'Handover');

export default render;

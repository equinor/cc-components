import { configure, WorkspaceWrapper } from '@cc-components/workorderapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const WorkorderApp = () => {
  const client = useHttpClient('cc-app');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(WorkorderApp, configure, 'Workorder');

export default render;

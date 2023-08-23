import { configure, WorkspaceWrapper } from '@cc-components/loopapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { FusionModelViewer } from '@cc-components/modelviewer';

const LoopApp = () => {
  //const client = useHttpClient('cc-api');
  return (
    <FusionModelViewer />
    // <RootAppWrapper client={client}>
    //   <WorkspaceWrapper />
    // </RootAppWrapper>
  );
};

export const render = createRender(LoopApp, configure, 'Loop');
export default render;

import { configure, WorkspaceWrapper } from '@cc-components/heattraceapp';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { createRender, RootAppWrapper } from '@cc-components/shared';

const MyApp = () => {
  const client = useHttpClient('cc-api');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(MyApp, configure);
export default render;

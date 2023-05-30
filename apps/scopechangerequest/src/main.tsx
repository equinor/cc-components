import { configure, WorkspaceWrapper } from '@cc-components/scopechangerequestapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const MyApp = () => {
  const client = useHttpClient('scopechange');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(MyApp, configure);
export default render;

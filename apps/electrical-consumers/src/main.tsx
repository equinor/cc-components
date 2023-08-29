import { configure, WorkspaceWrapper } from '@cc-components/electrical-consumersapp';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { createRender, RootAppWrapper } from '@cc-components/shared';

const ElectricalConsumersWorkspace = () => {
  const client = useHttpClient('cc-api');
  return (
    <RootAppWrapper client={client}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(ElectricalConsumersWorkspace, configure);
export default render;

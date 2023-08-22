import { configure, WorkspaceWrapper } from '@cc-components/electrical-consumersapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';

const MyApp = () => {
  return (
    <RootAppWrapper client={null}>
      <WorkspaceWrapper />
    </RootAppWrapper>
  );
};

export const render = createRender(MyApp, configure);

export default render;

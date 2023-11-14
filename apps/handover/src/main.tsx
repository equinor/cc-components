import { configure, WorkspaceWrapper } from '@cc-components/handoverapp';
import { createRender, RootAppWrapper } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { ThemeProvider } from '@equinor/fusion-react-styles';

const HandoverApp = () => {
  const client = useHttpClient('cc-app');
  return (
    <ThemeProvider theme={{}}>
      <RootAppWrapper client={client}>
        <WorkspaceWrapper />
      </RootAppWrapper>
    </ThemeProvider>
  );
};

export const render = createRender(HandoverApp, configure, 'Handover');
export default render;

import { fusionWorkspaceConfig } from '@cc-components/handoverapp';
import { Workspace } from '@equinor/workspace-fusion';
import { useMemo } from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
`;

export function App() {
  const controller = useMemo(() => fusionWorkspaceConfig(), []);
  return (
    <StyledApp>
      <Workspace controller={controller} />
    </StyledApp>
  );
}

export default App;

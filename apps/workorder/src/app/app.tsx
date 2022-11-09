import styled from 'styled-components';
import { Workspace } from '@equinor/workspace-fusion';
import { useMemo } from 'react';
import { fusionWorkspaceConfig } from '@cc-components/workorderapp';
const StyledApp = styled.div`
  height: 100vh;
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

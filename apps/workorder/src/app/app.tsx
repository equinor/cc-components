import styled from 'styled-components';
import { WorkspaceWrapper } from '@cc-components/workorderapp';
const StyledApp = styled.div`
  height: 100vh;
`;

export function App() {
  return (
    <StyledApp>
      <WorkspaceWrapper />
    </StyledApp>
  );
}

export default App;

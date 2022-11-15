import { Workspace } from '@cc-components/handoverapp';
import styled from 'styled-components';

const StyledApp = styled.div`
  height: 80vh;
  width: 80vw;
`;

export function App() {
  return (
    <StyledApp>
      <Workspace />
    </StyledApp>
  );
}

export default App;

import { Workspace } from '@cc-components/handoverapp';
import styled from 'styled-components';

const StyledApp = styled.div`
  height: 90vh;
  width: 90vw;
`;

export function App() {
  return (
    <StyledApp>
      <Workspace />
    </StyledApp>
  );
}

export default App;

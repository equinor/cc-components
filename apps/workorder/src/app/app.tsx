import styled from 'styled-components';
import { useMemo } from 'react';
import { Workspace } from '@cc-components/workorderapp';
const StyledApp = styled.div`
  height: 100vh;
`;

export function App() {
  return (
    <StyledApp>
      <Workspace />
    </StyledApp>
  );
}

export default App;

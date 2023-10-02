import { CircularProgress, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

export function CCApiAccessLoading() {
  return (
    <StyledFullSizeLoading>
      <CircularProgress size={48} />
      <Typography>Checking access...</Typography>
    </StyledFullSizeLoading>
  );
}
const StyledFullSizeLoading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1em;
`;

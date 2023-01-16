import { getSwcrStatusColor, SwcrStatus } from '@cc-components/swcrshared';
import { StyledContainer, StyledStatusColor, StyledTitle } from './filter.styles';

type StatusFilterProps = {
  status: SwcrStatus;
};
export const StatusFilter = ({ status }: StatusFilterProps) => {
  return (
    <StyledContainer>
      <StyledStatusColor color={getSwcrStatusColor(status)}></StyledStatusColor>
      <StyledTitle>{status}</StyledTitle>
    </StyledContainer>
  );
};

import { FollowUpStatuses } from '@cc-components/shared';
import { followUpColorMap } from '../utils-statuses';
import { StyledContainer, StyledStatusColor, StyledTitle } from './filter.styles';

type FollowUpStatusFilterProps = {
  status: FollowUpStatuses;
};
export const FollowUpStatusFilter = ({
  status,
}: FollowUpStatusFilterProps): JSX.Element => {
  return (
    <StyledContainer>
      <StyledStatusColor color={followUpColorMap[status]} />
      <StyledTitle title={status}>{status}</StyledTitle>
    </StyledContainer>
  );
};

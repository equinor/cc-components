import { TabTable } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';

import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';

type RequestTabProps = {
  request?: ScopeChangeRequest[] | undefined;
  isFetching?: boolean;
  error?: Error | null;
};
export const RequestTab = ({
  request,
  error,
  isFetching,
}: RequestTabProps): JSX.Element => {
  return (
    <StyledContentWrapper>
      <h1> test </h1>
    </StyledContentWrapper>
  );
};

import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { QueryBase } from './types';
import { TabTable } from '@cc-components/shared/table-helpers';
type QueryTabProps<T> = {
  queries: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const QueryTab = <T extends QueryBase>({
  error,
  isFetching,
  queries,
}: QueryTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={queries}
        resourceName="Query / Notification"
      />
    </StyledContentWrapper>
  );
};

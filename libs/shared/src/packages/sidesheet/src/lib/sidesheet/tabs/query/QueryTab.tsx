import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { QueryBase } from './types';
import { ReactElement } from 'react';

type QueryTabProps<T> = {
  queries: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const QueryTab = <T extends QueryBase>({
  error,
  isFetching,
  queries,
}: QueryTabProps<T>): ReactElement => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={queries}
        resourceName="Query"
      />
    </StyledContentWrapper>
  );
};

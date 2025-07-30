import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './detailsColumns';
import { SwcrBase } from './types';
import { ReactElement } from 'react';

type SwcrTabProps<T> = {
  swcrs: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const SwcrTab = <T extends SwcrBase>({
  error,
  isFetching,
  swcrs,
}: SwcrTabProps<T>): ReactElement => {
  return (
    <StyledContentWrapper>
      <TabTable
        packages={swcrs}
        error={error}
        isFetching={isFetching}
        resourceName="SWCR"
        columns={columns}
      />
    </StyledContentWrapper>
  );
};

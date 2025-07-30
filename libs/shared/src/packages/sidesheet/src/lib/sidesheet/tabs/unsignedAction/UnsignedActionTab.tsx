import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { UnsignedActionBase } from './types';
import { ReactElement } from 'react';

type UnsignedActionTabProps<T> = {
  unsignedActions: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const UnsignedActionTab = <T extends UnsignedActionBase>({
  unsignedActions,
  error,
  isFetching,
}: UnsignedActionTabProps<T>): ReactElement => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={unsignedActions}
        resourceName="Unsigned Actions"
      />
    </StyledContentWrapper>
  );
};

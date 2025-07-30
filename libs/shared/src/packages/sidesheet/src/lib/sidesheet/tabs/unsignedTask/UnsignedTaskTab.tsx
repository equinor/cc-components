import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { UnsignedTaskBase } from './types';
import { ReactElement } from 'react';

type UnsignedTaskTabProps<T> = {
  unsignedTasks: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const UnsignedTaskTab = <T extends UnsignedTaskBase>({
  error,
  isFetching,
  unsignedTasks,
}: UnsignedTaskTabProps<T>): ReactElement => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={unsignedTasks}
        resourceName="Unsigned Tasks"
      />
    </StyledContentWrapper>
  );
};

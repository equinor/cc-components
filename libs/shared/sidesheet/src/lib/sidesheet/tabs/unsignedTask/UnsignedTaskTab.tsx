import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { UnsignedTaskBase } from './types';
import { TabTable } from '@cc-components/shared/table-helpers';
type UnsignedTaskTabProps<T> = {
  unsignedTasks: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const UnsignedTaskTab = <T extends UnsignedTaskBase>({
  error,
  isFetching,
  unsignedTasks,
}: UnsignedTaskTabProps<T>): JSX.Element => {
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

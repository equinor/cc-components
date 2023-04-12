import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { UnsignedActionBase } from './types';

type UnsignedActionTabProps<T> = {
  unsignedActions: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const UnsignedActionTab = <T extends UnsignedActionBase>({
  unsignedActions,
  error,
  isFetching,
}: UnsignedActionTabProps<T>): JSX.Element => {
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

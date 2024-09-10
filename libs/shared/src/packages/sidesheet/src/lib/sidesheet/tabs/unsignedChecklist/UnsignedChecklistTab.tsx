import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { UnsignedChecklistBase } from './types';

type UnsignedChecklistTabProps<T> = {
  unsignedChecklists: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const UnsignedChecklistTab = <T extends UnsignedChecklistBase>({
  unsignedChecklists: unsignedChecklists,
  error,
  isFetching,
}: UnsignedChecklistTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={unsignedChecklists}
        resourceName="Unsigned Checklists"
      />
    </StyledContentWrapper>
  );
};

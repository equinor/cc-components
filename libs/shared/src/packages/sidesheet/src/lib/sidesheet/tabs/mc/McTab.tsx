import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { McBase } from './types';

type McTabProps<T> = {
  mc: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const McTab = <T extends McBase>({
  error,
  isFetching,
  mc,
}: McTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={mc}
        resourceName="MC"
      />
    </StyledContentWrapper>
  );
};

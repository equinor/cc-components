import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { SwcrBase } from './types';

type SwcrTabProps<T> = {
  swcrs: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const SwcrTab = <T extends SwcrBase>({
  error,
  isFetching,
  swcrs,
}: SwcrTabProps<T>): JSX.Element => {
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

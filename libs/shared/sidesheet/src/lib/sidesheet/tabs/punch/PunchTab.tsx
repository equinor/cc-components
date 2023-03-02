import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { PunchBase } from './type';
import { TabTable } from '@cc-components/shared/table-helpers';
type PunchTabProps<T> = {
  punches: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const PunchTab = <T extends PunchBase>({
  error,
  isFetching,
  punches,
}: PunchTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={punches}
        resourceName="Punch"
      />
    </StyledContentWrapper>
  );
};

import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { WorkorderBase } from './types';
import { TabTable } from '@cc-components/shared/table-helpers';

type WorkorderTabProps<T extends WorkorderBase> = {
  workorders: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const WorkorderTab = <T extends WorkorderBase>({
  workorders,
  error,
  isFetching,
}: WorkorderTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns()}
        error={error}
        isFetching={isFetching}
        packages={workorders}
        resourceName="Workorders"
      />
    </StyledContentWrapper>
  );
};

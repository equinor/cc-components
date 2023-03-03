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
  const estimateHoursMax = getMaxEstimateHours(workorders);
  const remainingHoursMax = getMaxRemaningHours(workorders);

  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns(estimateHoursMax, remainingHoursMax)}
        error={error}
        isFetching={isFetching}
        packages={workorders}
        resourceName="Workorders"
      />
    </StyledContentWrapper>
  );
};

const getMaxEstimateHours = (workorders: T[] | undefined) => {
  if (workorders === null || workorders === undefined) return 0;
  const estimateHoursMax = Math.max(
    ...workorders.map((workorder) => workorder.estimatedManHours)
  );
  return estimateHoursMax;
};

const getMaxRemaningHours = (workorders: T[] | undefined) => {
  if (workorders === null || workorders === undefined) return 0;
  const remainingHoursMax = Math.max(
    ...workorders.map((workorder) => workorder.remainingManHours)
  );
  return remainingHoursMax;
};

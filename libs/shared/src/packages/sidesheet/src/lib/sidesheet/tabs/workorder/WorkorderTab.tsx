import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { WorkorderBase } from './types';
import { GridOptions } from '@equinor/workspace-fusion/grid';

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
  const findMaxHours = (
    list: WorkorderBase[],
    key: 'estimatedHours' | 'remainingHours'
  ): number | null => {
    if (list.length === 0) return null;

    const getMaxValue = (item: WorkorderBase) => {
      return item[key] !== null ? item[key]! : Number.NEGATIVE_INFINITY;
    };

    const max = list.reduce((prev, current) => {
      return getMaxValue(current) > getMaxValue(prev) ? current : prev;
    });

    return max !== null && max[key] !== undefined ? max[key] : null;
  };

  let maxEstimatedHours: number | null = null;
  let maxRemainingHours: number | null = null;

  if (!isFetching) {
    maxEstimatedHours = findMaxHours(workorders || [], 'estimatedHours');
    maxRemainingHours = findMaxHours(workorders || [], 'remainingHours');
  }

  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns(maxEstimatedHours, maxRemainingHours)}
        error={error}
        isFetching={isFetching}
        packages={workorders || []}
        resourceName="Workorders"
      />
    </StyledContentWrapper>
  );
};

import { proCoSysStatusPriorityMap } from '@cc-components/shared';
import { ExtendedGardenFields, WorkOrder } from '../types';
import { followUpStatusPriorityMap, getStatusFn } from '../utils-statuses';
import { getGroupBy } from './getGroupBy';

const getPriorityMap = (groupBy: keyof WorkOrder | ExtendedGardenFields) => {
  return groupBy === 'wp' ? proCoSysStatusPriorityMap : followUpStatusPriorityMap;
};
/**
 * Function that will sort data inside each column based on the workorders' different statuses and priorities.
 * @param data List of workorders
 * @param groupByKeys List of grouping keys (only uses first item now, which is gardenKey)
 */
export const sortPackages = (
  data: WorkOrder[],
  ...groupByKeys: (keyof WorkOrder | ExtendedGardenFields)[]
): WorkOrder[] => {
  //TODO Handle multiple groupByKeys?
  const groupBy = groupByKeys[0] || 'hwp';
  const status = getStatusFn(groupBy);
  const priorityMap = getPriorityMap(groupBy);
  const sortBy =
    getGroupBy(groupBy).indexOf('Date') > 0 ? getGroupBy(groupBy) : 'workOrderNumber';
  return data.sort((a, b) => {
    const aStatus = status(a);
    const bStatus = status(b);
    return (
      /*eslint-disable @typescript-eslint/ban-ts-comment */
      //@ts-ignore
      (priorityMap[bStatus] || 0) - (priorityMap[aStatus] || 0) ||
      (a[sortBy] || '').localeCompare(b[sortBy] || '') ||
      a.workOrderNumber.localeCompare(b.workOrderNumber)
    );
  });
};

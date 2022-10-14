import { FollowUpStatuses, MaterialStatus } from '@cc-components/shared';
import { WorkOrder } from '../types';
import { getWoStatus } from './getWoStatus';
import { orderedProCoSysStatuses } from './orderedProCoSysStatuses';
const prepareMaterialStatus = (status: MaterialStatus): string[] => {
  const statusLower = status.toLowerCase();

  let number = statusLower.replace(/[^0-9]+/, '');
  if (number.length === 1) {
    number = '0' + number;
  }

  if (!number.length) {
    return [statusLower];
  }

  return [statusLower, 'm' + number];
};
const woHasMaterialStatus = (
  workOrder: WorkOrder,
  ...statuses: MaterialStatus[]
): number => {
  const materialStatuses = statuses
    .map((status) => prepareMaterialStatus(status))
    .reduce((all, current) => all.concat(current), []);
  const woMaterialStatus = workOrder?.materialStatus?.toLowerCase();
  return materialStatuses.filter(
    (materialStatus) => woMaterialStatus?.indexOf(materialStatus) === 0
  ).length;
};
const materialOk = (workOrder: WorkOrder): number =>
  woHasMaterialStatus(workOrder, 'M12', 'M13', 'MN');

const materialAvailable = (workOrder: WorkOrder): number =>
  woHasMaterialStatus(workOrder, 'M7', 'M9', 'M10', 'M11', 'MN');

/**
 * Function to retrieve "follow up" status of a package based on the package's projectProgress
 * and materialStatus.
 */
export const getFollowUpStatus = (workOrder: WorkOrder): FollowUpStatuses => {
  const status = getWoStatus(workOrder);
  const statusIndex = orderedProCoSysStatuses.indexOf(status);

  if (workOrder?.projectProgress === '100') {
    return FollowUpStatuses.WOFinished;
  } else if (materialOk(workOrder) && [4, 5, 6, 7, 8, 9, 10].indexOf(statusIndex) > -1) {
    return FollowUpStatuses.MaterialAndWoOk;
  } else if (
    materialAvailable(workOrder) &&
    [3, 4, 5, 6, 7, 8, 9, 10].indexOf(statusIndex) > -1
  ) {
    return FollowUpStatuses.MaterialAndWoAvailable;
  }

  return FollowUpStatuses.MaterialAndOrWoNotAvailable;
};

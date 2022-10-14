import { ExtendedGardenFields, WorkOrder } from '../types';

export const getGroupBy = (
  groupBy: ExtendedGardenFields | keyof WorkOrder
): keyof WorkOrder => {
  switch (groupBy) {
    case 'wp':
    case 'hwp':
      return 'plannedStartupDate';
    case 'fwp':
      return 'plannedFinishDate';

    default:
      return groupBy;
  }
};

import { getYearAndWeekFromString } from '@cc-components/shared';
import { ExtendedGardenFields, WorkOrder } from '../types';
import { getGroupBy } from './getGroupBy';

export const columnKeyAccessor = (
  item: WorkOrder,
  key: keyof WorkOrder | ExtendedGardenFields
): string => {
  const groupBy = getGroupBy(key);
  switch (groupBy) {
    case 'plannedStartupDate':
    case 'plannedFinishDate':
      return getYearAndWeekFromString(item[groupBy] || '');
    default:
      return item[groupBy] ?? 'N/A';
  }
};

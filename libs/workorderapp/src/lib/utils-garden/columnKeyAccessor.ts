import { getYearAndWeekFromString } from '@cc-components/shared';
import { WorkOrder } from '@cc-components/workordershared';
import { ExtendedGardenFields } from '../types';
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

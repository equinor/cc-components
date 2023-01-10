import { getYearAndWeekFromDate } from '@cc-components/shared';
import { WorkOrder } from '@cc-components/workordershared';
import { ExtendedGardenFields } from '../types';
import { getGroupBy } from './getGroupBy';

export const getHighlightedColumn = (
  groupByKey: keyof WorkOrder | ExtendedGardenFields
): string | undefined => {
  const groupBy = getGroupBy(groupByKey);
  switch (groupBy) {
    case 'plannedStartupDate':
    case 'plannedFinishDate':
      return getYearAndWeekFromDate(new Date());
    default:
      return undefined;
  }
};

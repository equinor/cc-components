import { getYearAndWeekFromDate } from '@cc-components/shared';
import { ExtendedGardenFields, WorkOrder } from '../types';
import { getGroupBy } from './getGroupBy';

export const getHighlightedColumn = (
  groupByKey: keyof WorkOrder | ExtendedGardenFields
) => {
  const groupBy = getGroupBy(groupByKey);
  switch (groupBy) {
    case 'plannedStartupDate':
    case 'plannedFinishDate':
      return getYearAndWeekFromDate(new Date());
    default:
      return undefined;
  }
};

import { getYearAndWeekFromDate } from '@cc-components/shared';
import { ExtendedGardenFields, SwcrPackage } from '../types';

export const getHighlighColumn = (
  groupByKey: keyof SwcrPackage | ExtendedGardenFields
) => {
  return groupByKey === 'createdAtDate' || groupByKey === 'dueAtDate'
    ? getYearAndWeekFromDate(new Date())
    : undefined;
};

import { getYearAndWeekFromDate } from '@cc-components/shared/utils-dates';
import { SwcrPackage } from '@cc-components/swcrshared';
import { ExtendedGardenFields } from '../types';

export const getHighlighColumn = (
  groupByKey: keyof SwcrPackage | ExtendedGardenFields
) => {
  return groupByKey === 'createdAtDate' || groupByKey === 'dueAtDate'
    ? getYearAndWeekFromDate(new Date())
    : undefined;
};

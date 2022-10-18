import {
  getYearAndWeekAndDayFromString,
  getYearAndWeekFromDate,
} from '@cc-components/shared';
import { CustomGroupByKeys, ExtendedGardenFields, Punch } from '../types';

export const getHighlightedColumn = (
  groupByKey: keyof Punch | ExtendedGardenFields,
  customGroupByKeys: CustomGroupByKeys
) => {
  const { weeklyDaily } = customGroupByKeys;

  switch (groupByKey) {
    case 'RFO':
    case 'RFC':
      return weeklyDaily === 'Daily'
        ? getYearAndWeekAndDayFromString(new Date().toString())
        : getYearAndWeekFromDate(new Date());

    default:
      return undefined;
  }
};

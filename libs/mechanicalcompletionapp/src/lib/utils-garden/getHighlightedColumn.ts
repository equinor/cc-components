import {
  getYearAndWeekAndDayFromString,
  getYearAndWeekFromDate,
} from '@cc-components/shared';
import { CustomGroupByKeys } from '../types';

export const getHighlightedColumn = (
  groupByKey: string,
  customGroupByKeys?: Record<string, unknown>
): string | undefined => {
  const { weeklyDaily } = customGroupByKeys as CustomGroupByKeys;

  if (
    groupByKey === 'finalPunch' ||
    groupByKey === 'rfcmc' ||
    groupByKey === 'rfcc' ||
    groupByKey === 'punchAccepted'
  ) {
    return weeklyDaily === 'Daily'
      ? getYearAndWeekAndDayFromString(new Date().toString())
      : getYearAndWeekFromDate(new Date());
  } else {
    return undefined;
  }
};

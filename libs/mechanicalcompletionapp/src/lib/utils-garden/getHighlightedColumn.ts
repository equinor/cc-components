import {
  getYearAndWeekAndDayFromString,
  getYearAndWeekFromDate,
} from '@cc-components/shared';
import { CustomGroupByKeys, ExtendedGardenFields, McPackage } from '../types';

export const getHighlightedColumn = (
  groupByKey: keyof McPackage | ExtendedGardenFields,
  customGroupByKeys: CustomGroupByKeys = {
    weeklyDaily: 'Weekly',
    plannedForecast: 'Planned',
  }
): string | undefined => {
  const { weeklyDaily } = customGroupByKeys;

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

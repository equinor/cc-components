import { HandoverPackage } from '@cc-components/handovershared';
import {
  getYearAndWeekAndDayFromString,
  getYearAndWeekFromDate,
} from '@cc-components/shared/utils-dates';

import { ExtendedGardenFields, HandoverCustomGroupByKeys } from '../types';
import { getFieldKeyBasedOnPlannedForecast } from './getFieldKeyBasedOnPlannedForecast';

export const getHighlightedColumn = (
  groupByKey: keyof HandoverPackage | ExtendedGardenFields,
  customGroupByKeys?: HandoverCustomGroupByKeys
) => {
  const customKeys = customGroupByKeys;
  const groupByOption = getFieldKeyBasedOnPlannedForecast(
    groupByKey,
    customKeys?.plannedForecast
  );
  switch (groupByOption) {
    case 'rfoPlannedDate':
    case 'rfoForecastDate':
    case 'rfcPlannedDate':
    case 'rfcForecastDate':
    case 'tacPlannedDate':
    case 'tacForecastDate':
    case 'dccPlannedDate':
    case 'dccForecastDate':
    case 'rfrcPlannedDate':
    case 'rfrcForecastDate':
      return customKeys?.weeklyDaily === 'Daily'
        ? getYearAndWeekAndDayFromString(new Date().toString())
        : getYearAndWeekFromDate(new Date());

    default:
      return undefined;
  }
};

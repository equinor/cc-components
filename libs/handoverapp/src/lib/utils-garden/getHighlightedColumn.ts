import { HandoverPackage } from '@cc-components/handovershared';
import {
  getYearAndWeekAndDayFromString,
  getYearAndWeekFromDate,
} from '@cc-components/shared';
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
    case 'plannedFinishDate':
    case 'forecastFinishDate':
    case 'plannedStartDate':
    case 'forecastStartDate':
    case 'plannedTacDate':
    case 'forecastTacDate':
    case 'demolitionPlannedStartDate':
    case 'demolitionForecastStartDate':
    case 'demolitionPlannedFinishDate':
    case 'demolitionForecastFinishDate':
      return customKeys?.weeklyDaily === 'Daily'
        ? getYearAndWeekAndDayFromString(new Date().toString())
        : getYearAndWeekFromDate(new Date());

    default:
      return undefined;
  }
};

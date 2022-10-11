import {
  getYearAndWeekAndDayFromString,
  getYearAndWeekFromDate,
} from '@cc-components/shared';
import { HandoverCustomGroupByKeys } from '../types';
import { getFieldKeyBasedOnPlannedForecast } from './getFieldKeyBasedOnPlannedForecast';

export const getHighlightedColumn = (
  groupByKey: string,
  customGroupByKeys: Record<string, unknown> | undefined
) => {
  const customKeys = customGroupByKeys as HandoverCustomGroupByKeys;
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

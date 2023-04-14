import { hasProperty } from '../../../../utils-typescript/src/lib/hasProperty';
import { getYearAndWeekAndDayFromString } from './getYearAndWeekAndDayFromString';
import { getYearAndWeekFromString } from './getYearAndWeekFromString';

const getKeyData = <T extends Record<PropertyKey, unknown>>(
  item: T,
  groupBy: keyof T
): string | undefined => {
  const value = item[groupBy];

  if (value) return String(value);

  // Use planned dates instead of forecast because of lack of forecast data.
  const groupByPlanned = String(groupBy)
    .replace('forecast', 'planned')
    .replace('Forecast', 'Planned');

  if (hasProperty(item, groupByPlanned)) {
    return String(item[groupByPlanned]);
  } else {
    return undefined;
  }
};

/**
 * Function to extract a formatted date value based on grouping key.
 * If group key follows the naming convention `xxxPlanned/ForecastDate`, forecast will be replaced with planned if it lacks data.
 * Invalid dates will return `N/A`.
 */
export const getColumnDateKey = <T extends Record<PropertyKey, unknown>>(
  groupKey: keyof T,
  weeklyDaily: 'Weekly' | 'Daily',
  item: T
): string => {
  const date = getKeyData(item, groupKey);
  return weeklyDaily === 'Weekly'
    ? getYearAndWeekFromString(date)
    : getYearAndWeekAndDayFromString(date);
};

import { getColumnDateKey, GetKeyFunction } from '@cc-components/shared';
import { CustomGroupByKeys, ExtendedGardenFields, Punch } from '../types';
const getFieldKeyBasedOnPlannedForecast = (
  groupBy: keyof Punch | ExtendedGardenFields | string,
  plannedForecast: CustomGroupByKeys['plannedForecast']
): keyof Punch => {
  switch (groupBy) {
    case 'RFC':
      return plannedForecast === 'Forecast' ? 'c01ForecastDate' : 'c01PlannedDate';
    case 'RFO':
      return plannedForecast === 'Forecast' ? 'c07ForecastDate' : 'c07PlannedDate';

    default:
      return 'c01PlannedDate';
  }
};
export const getDateKey: GetKeyFunction<Punch> = (item, key, groupBy) => {
  const { plannedForecast, weeklyDaily } = groupBy as CustomGroupByKeys;
  const fieldKey = getFieldKeyBasedOnPlannedForecast(key, plannedForecast);
  return getColumnDateKey(fieldKey, weeklyDaily, item);
};

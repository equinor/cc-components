import {
  getYearAndWeekAndDayFromString,
  getYearAndWeekFromString,
  hasProperty,
} from '@cc-components/shared';
import type { ExtendedGardenFields, McPackage } from '../types';

const getFieldKeyBasedOnPlannedForecast = (
  groupBy: ExtendedGardenFields | string,
  plannedForecast: string
): keyof McPackage => {
  switch (groupBy) {
    case 'finalPunch':
      return plannedForecast === 'Forecast'
        ? 'finalPunchForecastDate'
        : 'finalPunchPlannedDate';

    case 'rfcmc':
      return plannedForecast === 'Forecast' ? 'rfccForecastDate' : 'rfccPlannedDate';

    case 'rfcc':
      return plannedForecast === 'Forecast' ? 'rfccForecastDate' : 'rfccPlannedDate';

    case 'punchAccepted':
      return plannedForecast === 'Forecast'
        ? 'punchAcceptActualDate'
        : 'punchAcceptActualDate';

    default:
      return 'rfccActualDate';
  }
};

const getKeyData = (item: McPackage, groupBy: keyof McPackage): string => {
  const value = item[groupBy].toString();

  if (value) return value;

  // Use planned dates instead of forecast because of lack of forecast data.
  const groupByPlanned = groupBy
    .replace('forecast', 'planned')
    .replace('Forecast', 'Planned');

  if (hasProperty(item, groupByPlanned)) {
    return String(item[groupByPlanned]);
  } else {
    return item[groupBy].toString();
  }
};
const getColumnDateKey = (
  mcFieldKey: keyof McPackage,
  weeklyDaily: 'Weekly' | 'Daily',
  item: McPackage
): string => {
  const date = getKeyData(item, mcFieldKey);
  return weeklyDaily === 'Weekly'
    ? getYearAndWeekFromString(date)
    : getYearAndWeekAndDayFromString(date);
};
// export const getDateKey: GetKeyFunction<McPackage> = (item, key, groupBy) => {
//   const { plannedForecast, weeklyDaily } = groupBy as CustomGroupByKeys;
//   const mcFieldKey = getFieldKeyBasedOnPlannedForecast(key, plannedForecast);
//   return getColumnDateKey(mcFieldKey, weeklyDaily, item);
// };

// import { McPackage } from '@cc-components/mechanicalcompletionshared';
// import { getColumnDateKey } from '@cc-components/shared/utils-dates';
// import type { CustomGroupByKeys, ExtendedGardenFields } from '../types';

// const getFieldKeyBasedOnPlannedForecast = (
//   groupBy: ExtendedGardenFields | keyof McPackage,
//   plannedForecast: 'Planned' | 'Forecast'
// ): keyof McPackage => {
//   switch (groupBy) {
//     case 'finalPunch':
//       return plannedForecast === 'Forecast'
//         ? 'finalPunchForecastDate'
//         : 'finalPunchPlannedDate';

//     case 'rfcmc':
//       return plannedForecast === 'Forecast' ? 'rfccForecastDate' : 'rfccPlannedDate';

//     case 'rfcc':
//       return plannedForecast === 'Forecast' ? 'rfccForecastDate' : 'rfccPlannedDate';

//     case 'punchAccepted':
//       return plannedForecast === 'Forecast'
//         ? 'punchAcceptActualDate'
//         : 'punchAcceptActualDate';

//     default:
//       return 'rfccActualDate';
//   }
// };

// //TODO: Update types when Garden package is released
// export const getDateKey = (
//   item: McPackage,
//   key: keyof McPackage | ExtendedGardenFields,
//   groupBy?: CustomGroupByKeys
// ) => {
//   if (!groupBy) {
//     return 'N/A';
//   }
//   const { plannedForecast, weeklyDaily } = groupBy;
//   const mcFieldKey = getFieldKeyBasedOnPlannedForecast(key, plannedForecast);
//   return getColumnDateKey(mcFieldKey, weeklyDaily, item);
// };

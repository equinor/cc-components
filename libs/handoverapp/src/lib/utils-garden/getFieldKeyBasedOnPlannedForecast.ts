import { HandoverPackage } from '@cc-components/handovershared';
import { ExtendedGardenFields, HandoverCustomGroupByKeys } from '../types';

export const getFieldKeyBasedOnPlannedForecast = (
  groupBy: keyof HandoverPackage | ExtendedGardenFields,
  plannedForecast: HandoverCustomGroupByKeys['plannedForecast'] | undefined
): keyof HandoverPackage => {
  switch (groupBy) {
    case 'RFOC':
      return plannedForecast === 'Forecast' ? 'rfoForecastDate' : 'rfoPlannedDate';

    case 'RFCC':
      return plannedForecast === 'Forecast' ? 'rfcForecastDate' : 'rfcPlannedDate';

    case 'TAC':
      return plannedForecast === 'Forecast' ? 'tacForecastDate' : 'tacPlannedDate';

    case 'DCC':
      return plannedForecast === 'Forecast'
        ? 'dccForecastDate'
        : 'dccPlannedDate';

    case 'RFRC':
      return plannedForecast === 'Forecast'
        ? 'dccForecastDate'
        : 'dccPlannedDate';

    default:
      return 'rfrcPlannedDate';
  }
};

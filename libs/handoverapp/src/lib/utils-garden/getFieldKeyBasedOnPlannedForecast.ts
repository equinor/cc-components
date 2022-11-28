import { HandoverPackage } from '@cc-components/handovershared';
import { ExtendedGardenFields, HandoverCustomGroupByKeys } from '../types';

export const getFieldKeyBasedOnPlannedForecast = (
  groupBy: keyof HandoverPackage | ExtendedGardenFields,
  plannedForecast: HandoverCustomGroupByKeys['plannedForecast'] | undefined
): keyof HandoverPackage => {
  switch (groupBy) {
    case 'RFOC':
      return plannedForecast === 'Forecast' ? 'forecastFinishDate' : 'plannedFinishDate';

    case 'RFCC':
      return plannedForecast === 'Forecast' ? 'forecastStartDate' : 'plannedStartDate';

    case 'TAC':
      return plannedForecast === 'Forecast' ? 'forecastTacDate' : 'plannedTacDate';

    case 'DCC':
      return plannedForecast === 'Forecast'
        ? 'demolitionForecastStartDate'
        : 'demolitionPlannedStartDate';

    case 'RFRC':
      return plannedForecast === 'Forecast'
        ? 'demolitionForecastFinishDate'
        : 'demolitionPlannedFinishDate';

    default:
      return 'plannedFinishDate';
  }
};

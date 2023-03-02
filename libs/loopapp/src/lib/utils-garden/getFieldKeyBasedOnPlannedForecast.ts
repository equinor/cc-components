import { Loop } from '@cc-components/loopshared';
import { ExtendedGardenFields } from '../types';

//TODO: Might need to split dates into two properties from API
export const getFieldKeyBasedOnPlannedForecast = (
  groupBy: ExtendedGardenFields | keyof Loop
): keyof Loop => {
  switch (groupBy) {
    case 'RFC':
      return 'rfC_Planned_Forecast_Date';
    case 'RFO':
      return 'rfO_Planned_Forecast_Date';
    case 'MCComplete':
      return 'woPlannedCompletionDate';
    default:
      return 'rfC_Planned_Forecast_Date';
  }
};

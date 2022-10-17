import { ExtendedGardenFields, Loop } from '../types';

export const getGroupBy = (
  groupBy: keyof Loop | ExtendedGardenFields
): keyof Loop | undefined => {
  switch (groupBy) {
    case 'RFC':
      return 'rfC_Planned_Forecast_Date';
    case 'RFO':
      return 'rfO_Planned_Forecast_Date';
    default:
      return undefined;
  }
};

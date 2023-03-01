import { Loop } from '@cc-components/loopshared';
import { getYearAndWeekFromDate } from '@cc-components/shared/utils-dates';
import { ExtendedGardenFields } from '../types';
import { getGroupBy } from './getGroupBy';

export const getHighlightedColumn = (groupByKey: keyof Loop | ExtendedGardenFields) => {
  const groupBy = getGroupBy(groupByKey);

  switch (groupBy) {
    case 'rfC_Planned_Forecast_Date':
    case 'rfO_Planned_Forecast_Date':
      return getYearAndWeekFromDate(new Date());

    default:
      return undefined;
  }
};

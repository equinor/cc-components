import { Punch } from '@cc-components/punchshared';
import { getYearAndWeekFromDate } from '@cc-components/shared/utils-dates';

import { ExtendedGardenFields } from '../types';

export const getHighlightedColumn = (groupByKey: keyof Punch | ExtendedGardenFields) => {
  switch (groupByKey) {
    case 'dueDate':
    case 'handoverPlan':
    case 'rfC_PlannedForecastDate':
    case 'rfO_PlannedForecastDate':
    case 'createdDate':
    case 'clearedAtDate':
    case 'verifiedAtDate':
      return getYearAndWeekFromDate(new Date());

    default:
      return undefined;
  }
};

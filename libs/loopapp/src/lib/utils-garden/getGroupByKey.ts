import { Loop } from '@cc-components/loopshared';
import { getColumnDateKey } from '@cc-components/shared/utils-dates';
import { CustomGroupByKeys, ExtendedGardenFields } from '../types';
import { getFieldKeyBasedOnPlannedForecast } from './getFieldKeyBasedOnPlannedForecast';

export const getDateKey = (
  item: Loop,
  key: keyof Loop | ExtendedGardenFields,
  groupBy: CustomGroupByKeys | undefined
) => {
  if (!groupBy) {
    return 'N/A';
  }
  const { weeklyDaily } = groupBy;
  const fieldKey = getFieldKeyBasedOnPlannedForecast(key);
  return getColumnDateKey(fieldKey, weeklyDaily, item);
};

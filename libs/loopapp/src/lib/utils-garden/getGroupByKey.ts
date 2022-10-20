import { getColumnDateKey } from '@cc-components/shared';
import { CustomGroupByKeys, ExtendedGardenFields, Loop } from '../types';
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

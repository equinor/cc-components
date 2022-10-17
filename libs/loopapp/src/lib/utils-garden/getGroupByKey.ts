import { getColumnDateKey } from '@cc-components/shared';
import { CustomGroupByKeys, Loop } from '../types';
import { getFieldKeyBasedOnPlannedForecast } from './getFieldKeyBasedOnPlannedForecast';

export const getDateKey = (item: Loop, key: keyof Loop, groupBy: CustomGroupByKeys) => {
  const { weeklyDaily } = groupBy;
  const fieldKey = getFieldKeyBasedOnPlannedForecast(key);
  return getColumnDateKey(fieldKey, weeklyDaily, item);
};

import { getColumnDateKey, GetKeyFunction } from '@cc-components/shared';
import { HandoverCustomGroupByKeys, HandoverPackage } from '../types';
import { getFieldKeyBasedOnPlannedForecast } from './getFieldKeyBasedOnPlannedForecast';

export const getDateKey: GetKeyFunction<HandoverPackage> = (item, key, groupBy) => {
  const { plannedForecast, weeklyDaily } = groupBy as HandoverCustomGroupByKeys;
  const handoverFieldKey = getFieldKeyBasedOnPlannedForecast(
    key as string,
    plannedForecast
  );
  return getColumnDateKey(handoverFieldKey, weeklyDaily, item);
};

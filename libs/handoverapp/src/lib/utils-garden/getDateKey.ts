import { HandoverPackage } from '@cc-components/handovershared';
import { getColumnDateKey } from '@cc-components/shared';
import { ExtendedGardenFields, HandoverCustomGroupByKeys } from '../types';
import { getFieldKeyBasedOnPlannedForecast } from './getFieldKeyBasedOnPlannedForecast';

export const getDateKey = (
  item: HandoverPackage,
  key: keyof HandoverPackage | ExtendedGardenFields,
  groupBy?: HandoverCustomGroupByKeys | undefined
) => {
  if (!groupBy) {
    return 'N/A';
  }
  const handoverFieldKey = getFieldKeyBasedOnPlannedForecast(
    key,
    groupBy.plannedForecast
  );
  return getColumnDateKey(handoverFieldKey, groupBy.weeklyDaily, item);
};

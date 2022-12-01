import { getYearAndWeekFromString } from '@cc-components/shared';
import { SwcrPackage } from '@cc-components/swcrshared';
import { GetKeyFunction } from '../types/getKeyFunction';

export const getRfccKey: GetKeyFunction<SwcrPackage> = (item) => [
  getYearAndWeekFromString(item.cpkgStartForecastAtDate || item.cpkgStartPlannedAtDate),
];

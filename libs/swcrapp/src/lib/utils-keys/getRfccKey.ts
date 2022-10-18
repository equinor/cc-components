import { getYearAndWeekFromString } from '@cc-components/shared';
import { SwcrPackage } from '../types';
import { GetKeyFunction } from '../types/getKeyFunction';

export const getRfccKey: GetKeyFunction<SwcrPackage> = (item) => [
  getYearAndWeekFromString(item.cpkgStartForecastAtDate || item.cpkgStartPlannedAtDate),
];

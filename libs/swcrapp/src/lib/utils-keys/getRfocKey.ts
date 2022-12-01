import { getYearAndWeekFromString } from '@cc-components/shared';
import { SwcrPackage } from '@cc-components/swcrshared';
import { GetKeyFunction } from '../types/getKeyFunction';

export const getRfocKey: GetKeyFunction<SwcrPackage> = (item) => [
  getYearAndWeekFromString(item.cpkgFinishForecastAtDate || item.cpkgFinishPlannedAtDate),
];

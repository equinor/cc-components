import { getYearAndWeekFromString } from '@cc-components/shared';
import { SwcrPackage } from '../types';
import { GetKeyFunction } from '../types/getKeyFunction';

export const getRfocKey: GetKeyFunction<SwcrPackage> = (item) => [
  getYearAndWeekFromString(item.cpkgFinishForecastAtDate || item.cpkgFinishPlannedAtDate),
];

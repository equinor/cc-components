import { getYearAndWeekFromString } from '@cc-components/shared';
import { GetKeyFunction, SwcrPackage } from '../types';

export const getStartImplForecastKey: GetKeyFunction<SwcrPackage> = (item) => {
  const workdays =
    parseInt(item.estimatedManhours) > 0
      ? Math.floor(parseInt(item.estimatedManhours) / 8)
      : 0;

  return [
    getYearAndWeekFromString(
      item.cpkgStartForecastAtDate || item.cpkgStartPlannedAtDate,
      14 + workdays
    ),
  ];
};

import { SwcrPackage } from '@cc-components/swcrshared';
import { GetKeyFunction } from '../types/getKeyFunction';

export const getHoursGroupKey: GetKeyFunction<SwcrPackage> = (item) => {
  const hours = parseInt(item.estimatedManhours) || 0;
  switch (true) {
    case hours === 0:
      return ['0'];
    case hours >= 1000:
      return ['1000+++'];
    case hours >= 500:
      return ['500-999'];
    case hours >= 200:
      return ['200-499'];
    case hours >= 100:
      return ['100-199'];
    case hours >= 50:
      return ['50-99'];
    case hours >= 20:
      return ['20-49'];
    case hours >= 10:
      return ['10-19'];
    case hours >= 5:
      return ['5-9'];
    case hours >= 1:
      return ['1-4'];
    default:
      return ['0'];
  }
};

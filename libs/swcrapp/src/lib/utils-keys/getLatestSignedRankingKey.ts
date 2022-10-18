import { GetKeyFunction, SwcrPackage } from '../types';

export const getLatestSignedRankingKey: GetKeyFunction<SwcrPackage> = (item) => [
  `${item.latestSignRanking || '0'}: ${item.status}`,
];

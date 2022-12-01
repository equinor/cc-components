import { GetKeyFunction } from '../types';
import { DEFAULT_BLANKSTRING } from '../constants/defaultBlankString';
import { SwcrPackage } from '@cc-components/swcrshared';
const getNextToSignKey = (nextToSign: string, ranking?: string): string => {
  if (!ranking?.length) ranking = '0';

  const nextToSignKey =
    nextToSign
      .substring(nextToSign.indexOf('('))
      .replace('(', '')
      .replace(')', '')
      .replace('Function:', '')
      .replace('Person:', '')
      .trimEnd() || DEFAULT_BLANKSTRING;

  return ranking === '0' && nextToSignKey === DEFAULT_BLANKSTRING
    ? nextToSignKey
    : `${ranking}: ${nextToSignKey}`;
};
export const getNextToSignKeys: GetKeyFunction<SwcrPackage> = (item) =>
  item.nextsToSign.map((next) => getNextToSignKey(next, item.nextSignRanking));

import { GetKeyFunction, SwcrPackage } from '../types';
import { nextToSignParallelRuleValidation } from './nextToSignParallelRuleValidation';
import { DEFAULT_BLANKSTRING } from '../constants/defaultBlankString';

const getNextSignatureRoleKey = (nextToSign: string, ranking?: string): string => {
  if (!ranking?.length) ranking = '0';

  const nextSignatureRoleKey =
    nextToSign.substring(0, nextToSign.indexOf('(')).trimEnd() || DEFAULT_BLANKSTRING;

  return ranking === '0' && nextSignatureRoleKey === DEFAULT_BLANKSTRING
    ? nextSignatureRoleKey
    : `${ranking}: ${nextSignatureRoleKey}`;
};

export const getNextSignatureRoleKeys: GetKeyFunction<SwcrPackage> = (item) =>
  item.nextsToSign
    .filter(nextToSignParallelRuleValidation)
    .map((next) => getNextSignatureRoleKey(next, item.nextSignRanking));

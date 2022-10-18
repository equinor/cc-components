import { GetKeyFunction, SwcrPackage } from '../types';
import { DEFAULT_BLANKSTRING } from '../constants/defaultBlankString';

export const getTypeKeys: GetKeyFunction<SwcrPackage> = (item) =>
  item.types.length ? item.types.split(',') : [DEFAULT_BLANKSTRING];

import { GetKeyFunction } from '../types';
import { DEFAULT_BLANKSTRING } from '../constants/defaultBlankString';
import { SoftwareChangeRecord } from '@cc-components/swcrshared';

export const getTypeKeys: GetKeyFunction<SoftwareChangeRecord> = (item) => '';
// item.types.length ? item.types.split(',') : [DEFAULT_BLANKSTRING];

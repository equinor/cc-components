import { GetKeyFunction } from '@cc-components/shared';
import { HandoverPackage } from '../types';

export const getProgressKey: GetKeyFunction<HandoverPackage> = (item) =>
  `${item.progress || '0'}%`;

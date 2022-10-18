import { SwcrPackage } from '../types';
import { GetKeyFunction } from '../types/getKeyFunction';

export const getIsSafetyKey: GetKeyFunction<SwcrPackage> = (item) => [
  item.types?.toLocaleLowerCase().includes('safety')
    ? 'Related'
    : ['70', '71', '72', '74', '79'].includes(item.system) ||
      ['E', 'F', 'P'].includes(item.controlSystem)
    ? 'Yes'
    : 'No',
];

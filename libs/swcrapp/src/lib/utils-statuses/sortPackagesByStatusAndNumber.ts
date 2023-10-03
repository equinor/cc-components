import { SwcrPackage } from '@cc-components/swcrshared';
import { getSwcrStatusPriority } from './getSwcrStatusPriority';

export const sortPackagesByStatusAndNumber = (
  columnA: SwcrPackage,
  columnB: SwcrPackage
): number =>
  getSwcrStatusPriority(columnA.status) - getSwcrStatusPriority(columnB.status) ||
  parseInt(columnA.softwareChangeRecordNo) - parseInt(columnB.softwareChangeRecordNo);

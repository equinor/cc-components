import { HandoverPackage } from '@cc-components/handovershared';
import { statusPriorityMap } from './statusPriorityMap';

export const sortPackagesByStatus = (a: HandoverPackage, b: HandoverPackage): number =>
  statusPriorityMap[b.commissioningPackageStatus] - statusPriorityMap[a.commissioningPackageStatus] ||
  a.commissioningPackageNo.localeCompare(b.commissioningPackageNo);

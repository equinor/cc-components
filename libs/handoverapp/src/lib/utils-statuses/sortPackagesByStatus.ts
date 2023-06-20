import { HandoverPackage } from '@cc-components/handovershared';
// import { getStatus } from './getStatus';
import { statusPriorityMap } from './statusPriorityMap';

export const sortPackagesByStatus = (a: HandoverPackage, b: HandoverPackage): number =>
  statusPriorityMap[b.commissioningPackageStatus] - statusPriorityMap[a.commissioningPackageStatus] ||
  a.commissioningPackageNo.localeCompare(b.commissioningPackageNo);

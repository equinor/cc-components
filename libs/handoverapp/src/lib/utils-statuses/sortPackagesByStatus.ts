import { HandoverPackage } from '@cc-components/handovershared';
import { getStatus } from './getStatus';
import { statusPriorityMap } from './statusPriorityMap';

export const sortPackagesByStatus = (a: HandoverPackage, b: HandoverPackage): number =>
  statusPriorityMap[getStatus(b)] - statusPriorityMap[getStatus(a)] ||
  a.commpkgNo.localeCompare(b.commpkgNo);

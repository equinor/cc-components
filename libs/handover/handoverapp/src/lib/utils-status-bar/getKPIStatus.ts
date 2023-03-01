import { HandoverPackage } from '@cc-components/handover/shared';
import type { KPIStatus } from '../types';

export const getKPIStatus = (pkg: HandoverPackage): KPIStatus => {
  if (
    pkg.mcPkgsRFOCSigned > 0 &&
    pkg.mcPkgsCount > 0 &&
    pkg.mcPkgsRFOCSigned === pkg.mcPkgsCount
  ) {
    return 'RFOC Accepted';
  }
  if (
    pkg.mcPkgsRFOCShipped > 0 &&
    pkg.mcPkgsCount > 0 &&
    pkg.mcPkgsRFOCShipped === pkg.mcPkgsCount
  ) {
    return 'RFOC Sent';
  }
  if (pkg.mcPkgsRFOCSigned > 0) {
    return 'RFOC Partly';
  }
  return 'OS';
};

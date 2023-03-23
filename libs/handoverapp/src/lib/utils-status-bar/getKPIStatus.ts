import { HandoverPackage } from '@cc-components/handovershared';
import type { KPIStatus } from '../types';

export const getKPIStatus = (pkg: HandoverPackage): KPIStatus => {
  if (
    pkg.mechanicalCompletionPkgsRfocSignedCount > 0 &&
    pkg.mechanicalCompletionPkgsCount > 0 &&
    pkg.mechanicalCompletionPkgsRfocSignedCount === pkg.mechanicalCompletionPkgsCount
  ) {
    return 'RFOC Accepted';
  }
  if (
    pkg.mechanicalCompletionPkgsRfocShippedCount > 0 &&
    pkg.mechanicalCompletionPkgsCount > 0 &&
    pkg.mechanicalCompletionPkgsRfocShippedCount === pkg.mechanicalCompletionPkgsCount
  ) {
    return 'RFOC Sent';
  }
  if (pkg.mechanicalCompletionPkgsRfocSignedCount > 0) {
    return 'RFOC Partly';
  }
  return 'OS';
};

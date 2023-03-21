import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { commissioningStatusOrder } from './commssioningStatusOrder';
import { getCommissioningStatus } from './getStatuses';

export const sortPackagesByStatus = (a: McPackage, b: McPackage): number => {
  return (
    commissioningStatusOrder[getCommissioningStatus(b)] -
      commissioningStatusOrder[getCommissioningStatus(a)] ||
    a.mechanicalCompletionPackageNo.localeCompare(b.mechanicalCompletionPackageNo)
  );
};

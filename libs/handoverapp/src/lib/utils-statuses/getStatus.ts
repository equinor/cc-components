import { HandoverPackage } from '@cc-components/handovershared';
import { PackageStatus } from '@cc-components/shared/types';

export const getStatus = (item: HandoverPackage): PackageStatus => {
  if (
    item.mechanicalCompletionPkgsRfocSignedCount > 0 &&
    item.mechanicalCompletionPkgsCount > 0 &&
    item.mechanicalCompletionPkgsRfocSignedCount === item.mechanicalCompletionPkgsCount
  )
    return 'RFOC Accepted';

  if (item.isRfoRejected) return 'RFOC Rejected';

  if (
    item.mechanicalCompletionPkgsRfocShippedCount > 0 &&
    item.mechanicalCompletionPkgsCount > 0 &&
    item.mechanicalCompletionPkgsRfocShippedCount === item.mechanicalCompletionPkgsCount
  )
    return 'RFOC Sent';

  if (item.isTacAccepted) return 'TAC Accepted';

  if (item.isTacShipped) return 'TAC Sent';

  if (item.isTacRejected) return 'TAC Rejected';

  if (
    item.mechanicalCompletionPkgsRfccSignedCount &&
    item.mechanicalCompletionPkgsCount &&
    item.mechanicalCompletionPkgsRfccSignedCount === item.mechanicalCompletionPkgsCount
  )
    return 'RFCC Accepted';

  if (item.isRfcRejected) return 'RFCC Rejected';

  if (
    item.mechanicalCompletionPkgsRfccShippedCount > 0 &&
    item.mechanicalCompletionPkgsCount > 0 &&
    item.mechanicalCompletionPkgsRfccShippedCount === item.mechanicalCompletionPkgsCount
  )
    return 'RFCC Sent';

  if (item.isDemolition && item.rfrcActualDate) return 'RFRC Accepted'; //D04

  if (item.isDemolition && item.rfrcShippedDate) return 'RFRC Sent'; //D03

  if (item.isDemolition && item.dccActualDate) return 'DCC Accepted'; //D02

  if (item.isDemolition && item.dccShippedDate) return 'DCC Sent'; //D01

  return 'OS';
};

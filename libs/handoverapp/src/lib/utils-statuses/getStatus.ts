import { HandoverPackage } from '@cc-components/handovershared';
import { PackageStatus } from '@cc-components/shared/types';

export const getStatus = (item: HandoverPackage): PackageStatus => {
  if (
    item.mcPkgsRFOCSigned > 0 &&
    item.mcPkgsCount > 0 &&
    item.mcPkgsRFOCSigned === item.mcPkgsCount
  )
    return 'RFOC Accepted';

  if (item.rfocIsRejected) return 'RFOC Rejected';

  if (
    item.mcPkgsRFOCShipped > 0 &&
    item.mcPkgsCount > 0 &&
    item.mcPkgsRFOCShipped === item.mcPkgsCount
  )
    return 'RFOC Sent';

  if (item.tacIsAccepted) return 'TAC Accepted';

  if (item.tacIsShipped) return 'TAC Sent';

  if (item.tacIsRejected) return 'TAC Rejected';

  if (
    item.mcPkgsRFCCSigned &&
    item.mcPkgsCount &&
    item.mcPkgsRFCCSigned === item.mcPkgsCount
  )
    return 'RFCC Accepted';

  if (item.rfccIsRejected) return 'RFCC Rejected';

  if (
    item.mcPkgsRFCCShippedCount > 0 &&
    item.mcPkgsCount > 0 &&
    item.mcPkgsRFCCShippedCount === item.mcPkgsCount
  )
    return 'RFCC Sent';

  if (item.isDemolition && item.demolitionActualFinishDate) return 'RFRC Accepted'; //D04

  if (item.isDemolition && item.demolitionRFRCShippedDate) return 'RFRC Sent'; //D03

  if (item.isDemolition && item.demolitionDCCAcceptedDate) return 'DCC Accepted'; //D02

  if (item.isDemolition && item.demolitionActualStartDate) return 'DCC Sent'; //D01

  return 'OS';
};

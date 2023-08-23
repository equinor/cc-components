import { PackageStatus } from '../../../types';

type RFCCBase = {
  rfccIsAccepted: boolean | null;
  rfccIsRejected: boolean | null;
  rfccIsShipped: boolean | null;
};
/**
 * Resolves the RFCC (Ready for Comissioning Certificate) status for an item.
 */
export const getRFCCStatus = <T extends RFCCBase>(item: T): PackageStatus =>
  item.rfccIsAccepted
    ? 'RFC Accepted'
    : item.rfccIsRejected
    ? 'RFC Rejected'
    : item.rfccIsShipped
    ? 'RFC Sent'
    : 'OS';

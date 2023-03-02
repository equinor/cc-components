import { PackageStatus } from '@cc-components/shared/types';

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
    ? 'RFCC Accepted'
    : item.rfccIsRejected
    ? 'RFCC Rejected'
    : item.rfccIsShipped
    ? 'RFCC Sent'
    : 'OS';

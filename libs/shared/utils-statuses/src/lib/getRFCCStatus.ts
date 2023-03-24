import { PackageStatus } from '@cc-components/shared/types';

type RFCCBase = {
  rfcIsAccepted: boolean | null;
  rfcIsRejected: boolean | null;
  rfcIsShipped: boolean | null;
};
/**
 * Resolves the RFCC (Ready for Comissioning Certificate) status for an item.
 */
export const getRFCCStatus = <T extends RFCCBase>(item: T): PackageStatus =>
  item.rfcIsAccepted
    ? 'RFCC Accepted'
    : item.rfcIsRejected
    ? 'RFCC Rejected'
    : item.rfcIsShipped
    ? 'RFCC Sent'
    : 'OS';

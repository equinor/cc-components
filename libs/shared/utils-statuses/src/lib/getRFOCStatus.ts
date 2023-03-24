import { PackageStatus } from '@cc-components/shared/types';

type RFOCBase = {
  rfoIsAccepted: boolean | null;
  rfoIsRejected: boolean | null;
  rfoIsShipped: boolean | null;
};
/**
 * Resolves the RFOC (Ready for Operation Certificate) status for an item.
 */
export const getRFOCStatus = <T extends RFOCBase>(item: T): PackageStatus =>
  item.rfoIsAccepted
    ? 'RFOC Accepted'
    : item.rfoIsRejected
    ? 'RFOC Rejected'
    : item.rfoIsShipped
    ? 'RFOC Sent'
    : 'OS';

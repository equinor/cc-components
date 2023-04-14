import { PackageStatus } from '../../../types';

type RFOCBase = {
  rfocIsAccepted: boolean | null;
  rfocIsRejected: boolean | null;
  rfocIsShipped: boolean | null;
};
/**
 * Resolves the RFOC (Ready for Operation Certificate) status for an item.
 */
export const getRFOCStatus = <T extends RFOCBase>(item: T): PackageStatus =>
  item.rfocIsAccepted
    ? 'RFOC Accepted'
    : item.rfocIsRejected
    ? 'RFOC Rejected'
    : item.rfocIsShipped
    ? 'RFOC Sent'
    : 'OS';

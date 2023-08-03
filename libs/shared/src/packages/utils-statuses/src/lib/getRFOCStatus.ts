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
    ? 'RFO Accepted'
    : item.rfocIsRejected
    ? 'RFO Rejected'
    : item.rfocIsShipped
    ? 'RFO Sent'
    : 'OS';

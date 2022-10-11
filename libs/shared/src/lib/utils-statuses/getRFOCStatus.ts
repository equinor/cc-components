import { PackageStatus } from '../types';

type RFOCBase = {
  rfocIsAccepted: boolean;
  rfocIsRejected: boolean;
  rfocIsShipped: boolean;
};
export const getRFOCStatus = <T extends RFOCBase>(item: T): PackageStatus =>
  item.rfocIsAccepted
    ? 'RFOC Accepted'
    : item.rfocIsRejected
    ? 'RFOC Rejected'
    : item.rfocIsShipped
    ? 'RFOC Sent'
    : 'OS';

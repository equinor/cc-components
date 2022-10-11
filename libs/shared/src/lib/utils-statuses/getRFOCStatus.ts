import { Status } from '../types';

type RFOCBase = {
  rfocIsAccepted: boolean;
  rfocIsRejected: boolean;
  rfocIsShipped: boolean;
};
export const getRFOCStatus = <T extends RFOCBase>(item: T): Status =>
  item.rfocIsAccepted
    ? 'RFOC Accepted'
    : item.rfocIsRejected
    ? 'RFOC Rejected'
    : item.rfocIsShipped
    ? 'RFOC Sent'
    : 'OS';

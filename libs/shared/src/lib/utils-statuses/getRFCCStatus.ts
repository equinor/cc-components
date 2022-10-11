import { PackageStatus } from '../types';

type RFCCBase = {
  rfccIsAccepted: boolean;
  rfccIsRejected: boolean;
  rfccIsShipped: boolean;
};
export const getRFCCStatus = <T extends RFCCBase>(item: T): PackageStatus =>
  item.rfccIsAccepted
    ? 'RFCC Accepted'
    : item.rfccIsRejected
    ? 'RFCC Rejected'
    : item.rfccIsShipped
    ? 'RFCC Sent'
    : 'OS';

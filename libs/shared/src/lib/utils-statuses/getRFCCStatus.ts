import { PackageStatus } from '../types';

type RFCCBase = {
  rfccIsAccepted: boolean | null;
  rfccIsRejected: boolean | null;
  rfccIsShipped: boolean | null;
};
export const getRFCCStatus = <T extends RFCCBase>(item: T): PackageStatus =>
  item.rfccIsAccepted
    ? 'RFCC Accepted'
    : item.rfccIsRejected
    ? 'RFCC Rejected'
    : item.rfccIsShipped
    ? 'RFCC Sent'
    : 'OS';

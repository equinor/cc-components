import { PackageStatus } from '@cc-components/shared/types';
import { itemContentColors } from '@cc-components/shared/mapping';

export const getTextColor = (status: PackageStatus) => {
  return (
    [
      'RFO Accepted',
      'RFO Sent',
      'RFO Partly signed',
      'RFR Accepted',
      'DCC Accepted',
      'RFO Rejected',
    ] as PackageStatus[]
  ).includes(status)
    ? itemContentColors.Dark
    : itemContentColors.Light;
};

import { PackageStatus } from '@cc-components/shared/types';
import { tokens } from '@equinor/eds-tokens';
import { itemContentColors } from '@cc-components/shared/mapping';
import { it } from 'node:test';

export const getTextColor = (status: PackageStatus) => {
  return (
    [
      'RFO Accepted',
      'RFO Partly signed',
      'RFR Accepted',
      'DCC Accepted',
      'RFO Rejected',
    ] as PackageStatus[]
  ).includes(status)
    ? itemContentColors.Dark
    : itemContentColors.Light;
};

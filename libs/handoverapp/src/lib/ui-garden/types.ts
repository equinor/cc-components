import { PackageStatus } from '@cc-components/shared';

export type ItemSize = 'small' | 'medium' | 'large';

export type ItemOptions = {
  size: ItemSize;
  status: PackageStatus;
  barColor: string;
  textColor: string;
  mcPackageColor: string;
  commStatusColor: string;
  showWarningIcon: boolean;
};

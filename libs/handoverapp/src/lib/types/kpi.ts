import { PackageStatus } from '@cc-components/shared/types';

export type KPIStatus =
  | Extract<PackageStatus, 'RFOC Accepted' | 'RFOC Sent' | 'OS'>
  | 'RFOC Partly';
export type KPI = Partial<KPIStatus> | 'overdue' | 'targetSum';

import { BaseStatus, PackageStatus } from '@cc-components/shared/types';

/**
 * DCC === demolitionStart
 * RFRC === demolitionFinish
 * Area === location
 *
 */

//TODO: Update to new properties when FAM is ready
export type HandoverPackage = {
  location: string | null;
  commissioningPackageNo: string;
  commissioningPackageId: string;
  commissioningPackageUrlId: string;
  commissioningPackageStatus: PackageStatus;
  description: string | null;
  //demolition
  dccShippedDate: string | null;
  rfrcShippedDate: string | null;
  dccActualDate: string | null;
  rfrcActualDate: string | null;
  dccForecastDate: string | null;
  rfrcForecastDate: string | null;
  dccPlannedDate: string | null;
  rfrcPlannedDate: string | null;

  rfcForecastDate: string | null;
  rfcPlannedDate: string | null;
  rfcShippedDate: string | null;
  rfoForecastDate: string | null;
  rfoPlannedDate: string | null;
  rfoActualDate: string | null;
  tacForecastDate: string | null;
  tacPlannedDate: string | null;
  isDemolition: string | null;
  mechanicalCompletionPkgsCount: number;
  mechanicalCompletionPkgsRfccShippedCount: number;
  mechanicalCompletionPkgsRfccSignedCount: number;
  mechanicalCompletionPkgsRfocShippedCount: number;
  mechanicalCompletionPkgsRfocSignedCount: number;
  mechanicalCompletionStatus: BaseStatus;
  phase: string | null;
  priority1: string | null;
  priority2: string | null;
  priority3: string | null;
  progress: string | null;
  projectIdentifier: string | null;
  projectDescription: string | null;
  remark: string | null;
  responsible: string | null;
  isRfcAccepted: boolean | null;
  isRfcShipped: boolean | null;
  isRfcRejected: boolean | null;
  isRfoAccepted: boolean | null;
  isRfoShipped: boolean | null;
  isRfoRejected: boolean | null;
  isTacAccepted: boolean | null;
  isTacShipped: boolean | null;
  isTacRejected: boolean | null;
  system: string | null;
  subSystem: string | null;
  volume: number;
  hasUnsignedActions: string | null;
};

export type Status = 'OS' | 'OK' | 'PA' | 'PB';
export type Loop = {
  loopUrl: string;
  commissioningPackageUrl: string;
  mechanicalCompletionPackageUrl: string;
  formTypeUrl: string;
  callOffNo: string | null;
  checklistId: string;
  checklistUrlId: string | null;
  commissioningPackageNo: string | null;
  commissioningPackageId: string | null;
  commissioningPackageUrlId: string | null;
  description: string | null;
  facility: string | null;
  formularGroup: string | null;
  formularType: string | null;
  function: string | null;
  functionalSystem: string | null;
  isOverdue: number | null;
  isVoided: boolean | null;
  location: string | null;
  loopContentStatus: Status | null;
  loopId: string;
  loopUrlId: string | null;
  loopNo: string;
  needDate: string | null;
  mechanicalCompletionPackageNo: string | null;
  mechanicalCompletionPackageId: string | null;
  mechanicalCompletionPackageUrlId: string | null;
  packageNo: string | null;
  priority1: string | null;
  priority2: string | null;
  priority3: string | null;
  project: string | null;
  register: string | null;
  remainingManHours: number | null;
  responsible: string | null;
  revision: string | null;
  rfC_Planned_Forecast_Date: string | null;
  rfO_Planned_Forecast_Date: string | null;
  signedDate: string | null;
  status: Status | null;
  system: string | null;
  tagStatus: string | null;
  verifiedDate: string | null;
  loopContentProgress: number | null;
  woActualCompletionDate: string | null;
  woPlannedCompletionDate: string | null;
};

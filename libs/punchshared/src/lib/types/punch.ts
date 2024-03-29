export type PunchStatus = 'Open' | 'Closed' | 'Cleared not verified';

export type Punch = {
  formTypeUrl: string;
  punchUrl: string;
  commissioningPackageUrl: string;
  mechanicalCompletionPackageUrl: string;
  tagUrl: string;
  workorderUrl: string;
  facility: string | null;
  project: string | null;
  punchItemNo: string;
  checklistId: string | null;
  checklistUrlId: string | null;
  description: string | null;
  category: string;
  raisedBy: string | null;
  clearedBy: string | null;
  dueDate: string | null;
  sorting: string | null;
  type: string | null;
  priority: string | null;
  priority1: string | null;
  priority2: string | null;
  priority3: string | null;
  status: PunchStatus;
  isOpen: number | null;
  hasWO: number | null;
  isOverdue: number | null;
  estimate: number | null;
  workOrderNo: string | null;
  workOrderId: string | null;
  workOrderUrlId: string | null;
  originalWorkOrderNo: string | null;
  softwareChangeRecordNo: string | null;
  documentNo: string | null;
  externalItemNo: string | null;
  materialRequired: boolean | null;
  materialEstimatedTimeOfArrival: string | null;
  externalMaterialNo: string | null;
  clearedAtDate: string | null;
  rejectedAtDate: string | null;
  verifiedAtDate: string | null;
  createdDate: string | null;
  formularGroup: string | null;
  formularType: string | null;
  formularDiscipline: string | null;
  tagId: string | null;
  tagUrlId: string | null;
  tagNo: string | null;
  discipline: string | null;
  disciplineDescription: string | null;
  responsible: string | null;
  callOffNo: string | null;
  packageNo: string | null;
  commissioningPackageNo: string | null;
  tagArea: string | null;
  commissioningPackageId: string | null;
  commissioningPackageUrlId: string | null;
  identifier: string | null;
  commissioningPackageArea: string | null;
  system: string | null;
  mechanicalCompletionPackageNo: string | null;
  mechanicalCompletionPackageId: string | null;
  mechanicalCompletionPackageUrlId: string | null;
  mechanicalCompletionStatus: string | null;
  handoverPlan: string;
  m03PlannedForecastDate: string | null;
  rfcPlannedForecastDate: string | null;
  rfoPlannedForecastDate: string | null;
  punchId: string | null;
  famUpsertedTime: string | null;
  rfcPlannedDate: string | null;
  rfoPlannedDate: string | null;
};

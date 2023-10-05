export type HandoverChild = {
  commpkgId: string;
  url: string;
};

export type HandoverDetails = {
  nextToSign: string;
} & HandoverChild;

export type HandoverMcpkg = {
  mechanicalCompletionPackageNo: string;
  mcPkgId: string;
  description: string | null;
  mechanicalCompletionStatus: string | null;
  rfO_Status: string | null;
  rfC_Status: string | null;
  mechanicalCompletionPackageUrl: string;
} & HandoverChild;

export type HandoverNCR = {
  documentNumber: string;
  documentId: string;
  title: string;
} & HandoverChild;

export type HandoverPunch = {
  tagNo: string;
  tagUrlId: string;
  category: string | null;
  description: string | null;
  clearedBy: string | null;
  sorting: string | null;
  tagUrl: string;
  isOpen: boolean;
} & HandoverChild;

export type HandoverQuery = {
  queryNo: string;
  queryId: string;
  queryUrl: string;
  title: string | null;
  queryStatus: string | null;
  nextToSign: string | null;
  queryType: string | null;
} & HandoverChild;

export type HandoverSWCR = {
  softwareChangeRecordNo: string;
  softwareChangeRecordId: string;
  softwareChangeRecordUrl: string;
  status: string;
  description: string;
  priority: string;
} & HandoverChild;

export type HandoverUnsignedAction = {
  actionNo: string;
  commissioningPackageUrlId: string;
  title: string;
  description: string;
  unsignedTaskUrl: string;
} & HandoverChild;

export type HandoverUnsignedTask = {
  taskId: string;
  title: string | null;
  description: string;
  unsignedTaskUrl: string;
  commissioningPackageUrl: string;
} & HandoverChild;

export type HandoverWorkOrder = {
  actualCompletionDate: string | null;
  discipline: string | null;
  estimatedHours: number | null;
  expendedHours?: number | null;
  jobStatus: string | null;
  plannedFinishDate: string | null;
  projectProgress: number | null;
  remainingHours: number | null;
  description: string | null;
  workOrderUrl: string;
  workOrderUrlId: string;
  workOrderNumber: string;
} & HandoverChild;

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
  punchAcceptedActualtDate: string | null;
} & HandoverChild;

export type HandoverNCR = {
  documentNumber: string;
  documentId: string;
  title: string;
} & HandoverChild;

export type HandoverPunch = {
  punchItemNo: string;
  punchUrl: string;
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
  workOrderNo: string;
  workOrderId: string;
  workOrderUrlId: string;
  projectProgress: number | null;
  title: string | null;
  description: null | null;
  jobStatus: string | null;
  materialStatus: string | null;
  commissioningPackageNo: string | null;
  commissioningPackageId: string | null;
  facility: string | null;
  commissioningPackageUrlId: string | null;
  discipline: string | null;
  plannedCompletionDate: string | null;
  actualCompletionDate: string | null;
  workOrderUrl: string;
  estimatedManHours: number | null;
  remainingManHours: number | null;
  workBreakdownStructure: string | null;
  responsible: string | null;
} & HandoverChild;

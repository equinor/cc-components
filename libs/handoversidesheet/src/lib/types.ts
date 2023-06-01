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
  rfO_Status : string | null;
  rfC_Status : string |null;
} & HandoverChild;

export type HandoverNCR = {
  documentNumber: string;
  documentId: string;
  title: string;
} & HandoverChild;

export type HandoverPunch = {
  tagNumber: string;
  tagId: string;
  status: string;
  description: string;
  toBeClearedBy: string;
  sorting: string;
} & HandoverChild;

export type HandoverQuery = {
  queryNumber: string;
  queryId: string;
  type: string;
  title: string;
  status: string;
  nextToSign: string;
} & HandoverChild;

export type HandoverSWCR = {
  swcrNumber: string;
  swcrId: string;
  status: string;
  description: string;
  priority: string;
} & HandoverChild;

export type HandoverUnsignedAction = {
  actionNumber: string;
  actionId: string;
  title: string;
  description: string;
} & HandoverChild;

export type HandoverUnsignedTask = {
  taskNumber: string;
  taskId: string;
  title: string;
} & HandoverChild;

export type HandoverWorkOrder = {
  workOrderNumber: string;
  workOrderStatus: string;
  workOrderStatusDescription: string;
  description: string;
  materialStatus: string;
  materialStatusDescription: string;
  projectProgress: string;
  plannedStartDate: string;
  plannedCompletionDate: string;
} & HandoverChild;

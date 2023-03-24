export type HandoverChild = {
  commpkgId: string;
  url: string;
};

export type HandoverDetails = {
  nextToSign: string;
} & HandoverChild;

export type HandoverMcpkg = {
  mechanicalCompletionPackageId: string;
  mechanicalCompletionPackageUrlId: string;
  mechanicalCompletionPackageNo: string;
  mechanicalCompletionPackageStatus: string | null;
  description: string | null;
  rfoIsShipped: boolean | null;
  rfoIsAccepted: boolean | null;
  rfoIsRejected: boolean | null;
  rfcIsShipped: boolean | null;
  rfcIsAccepted: boolean | null;
  rfcIsRejected: boolean | null;
};

export type HandoverNCR = {
  documentNumber: string;
  documentId: string;
  title: string;
} & HandoverChild;

export type HandoverPunch = {
  tagNumber: string;
  tagId: string;
  tagUrlId: string;
  status: string | null;
  description: string | null;
  toBeClearedBy: string | null;
  sorting: string | null;
};

export type HandoverQuery = {
  queryNumber: string;
  queryId: string;
  queryUrlId: string;
  title: string | null;
  status: string | null;
  nextToSign: string | null;
  type: string | null;
} & HandoverChild;

export type HandoverSWCR = {
  softwareChangeRecordId: string;
  softwareChangeRecordNo: string;
  softwareChangeRecordUrlId: string;
  status: string | null;
  description: string | null;
  priority: string | null;
};

export type HandoverUnsignedAction = {
  actionNo: string;
  actionId: string;
  actionUrlId: string;
  title: string | null;
  description: string | null;
};

export type HandoverUnsignedTask = {
  taskNo: string;
  taskId: string;
  taskUrlId: string;
  title: string | null;
};

export type HandoverWorkOrder = {
  workOrderNo: string;
  workOrderId: string;
  workOrderUrlId: string;
  description: string | null;
  plannedCompletionDate: string | null;
  actualCompletionDate: string | null;
  discipline: string | null;
  estimatedManHours: number | null;
  expendedManHours?: number | null;
  remainingManHours: number | null;
  jobStatus: string | null;
  projectProgress: number | null;
};

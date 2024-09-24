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
  id: string;
  title: string;
  description: string;
  proposedSolution: string;
  siye: string;
  requirementReference: string;
  initiatorReference: string;
  plantId: string;
  projectDefinition: string;
  state: string;
  currentStep: string;
  currentStepState: string;
  url: string;
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
  status: string | null;
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
  title: string;
  priority: string;
} & HandoverChild;

export type HandoverUnsignedChecklist = {
  type: string;
  group: string;
  discipline: string;
  responsible: string;
  tagNo: string;
  checklistUrl: string;
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
  workOrderNumber: string;
  workOrderId: string;
  workOrderUrlId: string;
  projectProgress: number | null;
  title: string;
  jobStatus: string;
  materialStatus: string;
  commissioningPackageUrl: string;
  facility: string;
  discipline: string;
  workOrderUrl: string | null;
  actualCompletionDate: string | null;
  plannedFinishDate: string | null;
  remainingHours: number | null;
  estimatedHours: number | null;
  responsible: string;
  workBreakdownStructure: string;
  commpkgId: string | null;
  commissioningPackageUrlId: string | null;
  commpkgNumber: string | null;
} & HandoverChild;

export type HandoverNotification = {
  notificationNo: string;
  type: string;
  title: string;
  status: string;
  nextToSign: string;
}
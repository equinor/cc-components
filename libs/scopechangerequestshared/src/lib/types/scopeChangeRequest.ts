// TODO: Make all variables nullable?
export type ScopeChangeRequest = {
  createdAtUtc: string;
  createdBy: CreatedBy;
  modifiedAtUtc: string;
  modifiedBy: ModifiedBy;
  id: string;
  sequenceNumber: number;
  title: string;
  description: string;
  phase: string;
  originSource: string;
  originSourceId: string;
  changeCategory: ChangeCategory;
  scope: Scope;
  estimatedChangeHours: number;
  actualChangeHours: number;
  potentialWarrantyCase: boolean;
  potentialAtsScope: boolean;
  materialsIdentifiedInStorage: boolean;
  materialsToBeBoughtByContractor: boolean;
  materialsNote: string;
  state: string;
  workflowStatus: string;
  isVoided: boolean;
  newRevisionOrVoidReason: string;
  serialNumber: string;
  originatorId: string;
  revisionNumber: number;
  hasComments: boolean;
  hasPendingContributions: boolean;
  currentWorkflowStep: CurrentWorkflowStep | null;
  workflowSteps: WorkflowStep[] | null;
  attachments: Attachment[];
  systems: System[];
  commissioningPackages: CommissioningPackage[];
  mcPackages: McPackage[];
  tags: Tag[];
  areas: Area[];
  logEntry: LogEntry[];
  punchListItems: PunchListItem[];
  documents: Document[];
  disciplineGuesstimates: DisciplineGuesstimate[];
  workOrders: WorkOrder[];
  workOrdersTotalEstimatedManHours: number;
  workOrdersTotalExpendedManHours: number;
  workOrdersTotalRemainingManHours: number;
};

export interface CreatedBy {
  id: string;
  oid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ModifiedBy {
  id: string;
  oid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ChangeCategory {
  id: string;
  name: string;
}

export interface Scope {
  id: string;
  name: string;
}

export interface CurrentWorkflowStep {
  id: string;
  name: string;
  order: number;
  isCurrent: boolean;
  isCompleted: boolean;
  criterias: Criteria[];
  contributors: Contributor[];
}

export interface Criteria {
  id: string;
  type: string;
  value: string;
  valueDescription: string;
  signedAtUtc: string;
  signedBy: SignedBy;
  signedComment: string;
  signedState: string;
}

export interface SignedBy {
  id: string;
  oid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Contributor {
  id: string;
  instructionsToContributor: string;
  person: Person;
  contribution: Contribution;
}

export interface Person {
  id: string;
  oid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Contribution {
  createdAtUtc: string;
  createdBy: CreatedBy;
  modifiedAtUtc: string;
  modifiedBy: ModifiedBy;
  id: string;
  comment: string;
  suggestion: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  order: number;
  isCurrent: boolean;
  isCompleted: boolean;
  criterias: Criteria[];
  contributors: Contributor[];
}

export interface Attachment {
  createdAtUtc: string;
  createdBy: CreatedBy;
  modifiedAtUtc: string;
  modifiedBy: ModifiedBy;
  id: string;
  fileName: string;
  fileSize: number;
  blobPath: string;
}

export interface System {
  id: string;
  procosysId: number;
  procosysCode: string;
}

export interface CommissioningPackage {
  id: string;
  procosysId: number;
  procosysNumber: string;
}

export interface McPackage {
  id: string;
  procosysId: number;
  procosysNumber: string;
}

export interface Tag {
  id: string;
  procosysId: number;
  procosysNumber: string;
}

export interface Area {
  id: string;
  procosysId: number;
  procosysCode: string;
}

export interface PunchListItem {
  id: string;
  procosysId: number;
}

export interface Document {
  id: string;
  stidDocumentNumber: string;
  stidDocumentRevisionNumber: string;
  stidDocumentRevisionDate: string;
}

export interface DisciplineGuesstimate {
  id: string;
  guesstimate: number;
  discipline: Discipline;
}

export interface Discipline {
  id: string;
  procosysId: number;
  procosysCode: string;
}

export interface WorkOrder {
  id: string;
  jobNumber: string;
  sourceIdentity: string;
  description: string;
  estimatedManHours: number;
  expendedManHours: number;
  remainingManHours: number;
}

export type LogEntry = {
  createdAtUtc: string;
  createdByAzureOid: string;
  modifiedAtUtc: string;
  modifiedByAzureOid: string;
  id: string;
  title: string;
  objectGuid: string;
  eventType: string;
  objectType: string;
  details: string;
};

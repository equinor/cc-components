import { PipetestStep } from './drcEnums';

export type Pipetest = {
  id:string;
  description: string
  pipetestMc: string;
  pipetestType: string;
  facility: string;
  project: string;
  rfCPlannedForecastDate: string;
  rfOPlannedForecastDate: string;
  m03PlannedForecastDate: string;
  signedDate: string;
  mechanicalCompletionUrlId: string;
  mechanicalCompletionResponsible: string;
  mechanicalCompletionPhase: string;
  mechanicalCompletionStatus: string;
  mechanicalCompletionId: string;
  mechanicalCompletionArea: string;
  mechanicalCompletionDiscipline: string;
  commissioningPackageNo: string;
  commissioningPackageId: string;
  commissioningPackageUrlId: string;
  commissioningResponsible: string;
  commissioningPhase: string;
  commissioningArea: string;
  commissioningStatus: string;
  priority1: string;
  priority2: string;
  priority3: string;
  identifier: string;
  identifierId: string;
  projectDescription: string;
  projectSchema?: string;
  commissioningPackageUrl?: string;
  mechanicalCompletionUrl?: string;
};

export type Checklist = {
  checklistId: string;
  checklistUrlId: string;
  tagNo: string;
  tagUrlId: string;
  revision: string;
  formularType: string;
  responsible: string;
  status: string;
  checklistUrl: string;
  tagUrl: string;
};

export type InsulationTagResponse = {
  pipeInsulationTags: InsulationTag[];
  boxInsulationTags: InsulationTag[];
}

export type InsulationTag = {
  tagNo: string;
  description: string;
  status: string;
  statusName: string;
  checklistStatus: string;
};

export type Circuit = {
  switchBoardTagNo: string;
  circuitAndStarterTagNo: string;
  checkLists: Checklist[];
  worstPipetestStep?: PipetestStep;
};

export type HeatTrace = Checklist;

export type ChecklistType = {
  tagNo: string;
  responsible: string;
  formularType: string;
  formularGroup: string;
  status: string;
  revision?: string;
  test?: string;
  isHeatTrace?: boolean;
  workflowStepText?: string | undefined;
};


export type InsulationBoxType = {
  objectNo: string;
  objectName: string;
  objectStatusName: string;
  objectStatus: string;
  object3dReference: string;
  procosysStatus: string;
};

export type Line = {
  tagNo: string;
  isCritical: boolean;
};

export type HTSidesheet = {
  value: string;
  items: Pipetest[];
};

export type HeatTraceGrouped = {
  htTagNo: string;
  pipetests: Pipetest[];
  count: number;
};

export type CircuitGrouped = {
  circuitTagNo: string;
  pipetests: Pipetest[];
  count: number;
};
  
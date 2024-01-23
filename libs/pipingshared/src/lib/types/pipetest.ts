import { PipetestStep } from './drcEnums';

export type Pipetest = {
  id:string;
  pipetestMc: string;
  pipetestType: string;
  facility: string;
  project: string;
  rfCPlannedForecastDate: Date;
  rfOPlannedForecastDate: Date;
  m03PlannedForecastDate: Date;
  signedDate: Date;
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
  projectSchema: string;
};

export type CheckList = {
  tagNo: string;
  responsible: string;
  formularType: string;
  formularGroup: string;
  status: string;
  revision?: string;
  test?: string;
  isHeatTrace?: boolean;
  workflowStepText?: string | undefined;
  stepName?: string;
  c01Planned?: string;
  c01Forecast?: string;
  m03Planned?: string;
  m03Forecast?: string;
  m04Actual?: string;
  underline?: string;
  signedDate?: string;
  worstPipetestStep?: PipetestStep;
};

export type InsulationBox = {
  objectNo: string;
  objectName: string;
  objectStatusName: string;
  objectStatus: string;
  object3dReference: string;
  procosysStatus: string;
};

export type Circuit = {
  switchBoardTagNo: string;
  circuitAndStarterTagNo: string;
  checkLists: CheckList[];
  worstPipetestStep?: PipetestStep;
};

export type HeatTrace = CheckList;

export type CheckListType = {
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

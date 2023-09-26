export type HeatTrace = {
  facility: string;
  project: string;
  heatTraceCableNo: string;
  heatTraceCableId: string;
  heatTraceCableUrlId: string;
  heatTraceCableDescription: string;
  register: string;
  commissioningPackageNo: string | null;
  commissioningPackageId: string | null;
  commissioningPackageUrlId: string | null;
  commissioningResponsible: string | null;
  commissioningPhase: string | null;
  commissioningArea: string | null;
  commissioningStatus: string | null;
  mechanicalCompletionPackageNo: string | null;
  mechanicalCompletionPackageId: string | null;
  mechanicalCompletionUrlId: string | null;
  mechanicalCompletionResponsible: string | null;
  mechanicalCompletionPhase: string | null;
  mechanicalCompletionStatus: string | null;
  mechanicalCompletionId: string | null;
  mechanicalCompletionArea: string | null;
  mechanicalCompletionDiscipline: string | null;
  status: string;
  discipline: string;
  location: string;
  isVoided: string | null;
  engineeringCode: string;
  priority1: string | null;
  priority2: string | null;
  priority3: string | null;
  projectDescription: string | null;
  projectSchema: string | null;
  mountedOnTagId: string | null;
  pipetest: string | null;
  pipetestType: string;
  system: string | null;
  rfCPlannedForecastDate: string;
  rfOPlannedForecastDate: string;
  m03PlannedForecastDate: string | null;
  signedDate: string;
  identifier: string | null;
  identifierId: string | null;
};

export interface Pipetest {
  name: string;
  description: string;
  commPkPriority1: string;
  rfccPlanned: string;
  location: string;
  mcPkgId: string;
  mcPkgUrlId: string;
  checkLists: CheckList[];
  insulationBoxes: InsulationBox[];
  circuits: Circuit[];
  lines: Line[];
  hasDisconnectedEquipment: boolean;
  hasIsolatedEquipment: boolean;
}

export type CheckList = {
  revision?: string;
  isHeatTrace: boolean;
  signedDate?: string;
  c01Planned: string;
  c01Forecast: string;
  m03Planned: string;
  m03Forecast: string | null;
  m04Actual: string | null;
  tagNo: string;
  responsible: string;
  formularType: string;
  formularGroup: string;
  status: string;
};

export interface InsulationBox {
  objectNo: string;
  objectName: string;
  objectStatusName?: string;
  objectStatus?: string;
  object3dReference?: string;
  procosysStatus?: string;
}

export interface Circuit {
  switchBoardTagNo: string;
  circuitAndStarterTagNo: string;
  checkLists: CheckList[];
  cableTagNos: string[];
}

export interface Line {
  tagNo: string;
  isCritical: boolean;
}

export type HeatTrace = {
  facility: string;
  project: string;
  heatTraceCableNo: string;
  heatTraceCableId: string;
  heatTraceCableDescription: string;
  heatTraceCableUrlId: string;
  register: string;
  commissioningPackageNo: string;
  commissioningPackageId: string;
  mechanicalCompletionPackageId: string;
  mechanicalCompletionPackageNo: string;
  status: string;
  discipline: string;
  location: string;
  isVoided: string;
  engineeringCode: string;
  priority1: string;
  priority2: string;
  priority3: string;
  responsible: string;
  projectDescription: string;
  projectSchema: string;
  mountedOnTagId: string;
  pipetest: string;
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

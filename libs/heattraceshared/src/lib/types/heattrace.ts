export type Heattrace = {
  revision: string | null;
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
  pipetests: Pipetest[];
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

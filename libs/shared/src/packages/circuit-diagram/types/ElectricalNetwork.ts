export type ElectricalNetwork = {
  eleSymbolCode:
    | 'K_BOX'
    | 'HT_KAB'
    | 'KURS'
    | 'TAVLE'
    | 'KABEL'
    | 'VARME'
    | ({} & string);
  type: string;
  name: string;
  urlPath: string | null;
  busId: string | null;
  tagNoSwb: string | null;
  cubicleId: string | null;
  drawerId: string | null;
  status: string | null;
  tagStatus: string;
  description: string | null;
  hasChildren: boolean;
  isHighlighted: boolean;
  isSafetyCritical: boolean;
  fuseSize: string | null;
  locationCode: string | null;
  phases: string | null;
  htrcTypeCode: string | null;
  installedLength: string | null;
  cableSize: string | null;
  eleNetId: ElenetId | null;
  tags: Tag[];
  children: ElectricalNetwork[];
  commissioningPackageNo: string | null;
  mechanicalCompletionPackageNo: string | null;
  isInProjectMaster: boolean;
  projectCode: string;
  powerActive: string | null;
};

export interface ElenetId {
  instCode: string;
  tagNo: string;
  cubicleId: string | null;
  drawerId: string | null;
  branchId: number | null;
}

export type Tag = {
  tagNo: string;
  urlPath: string;
  tagStatus: string;
  cableSize: any;
  cableType: any;
  cableCode: any;
  cableLengthInst: any;
  isHighlighted: boolean;
  isSafetyCritical: boolean;
};

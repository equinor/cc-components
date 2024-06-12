export interface FamCommPkg {
  messageTimestamp: string
  famBehaviorTime: string
  sourceName: string
  sourceIdentity: string
  facility: string
  project: string
  location: string
  isVoided: boolean
  commissioningPackageNo: string
  description: string
  descriptionOfWork: string
  remark: string
  commissioningPhase: string
  progress: any
  demolition: boolean
  priority1: string
  priority2: string
  priority3: string
  identifier: string
  status: string
  dynamicCommissioningStatus: string
  responsible: string
  createdDate: string
  updatedDate: string
  urlId: string
}
export interface Famtag {
  tagNo: string
  worstStatus: 0 | 1 | 2 | 3
  mccrStatus: "OS" | "OK" | "PA" | "PB"
}

export type SwcrBase = {
  softwareChangeRecordNo: string;
  softwareChangeRecordUrl: string;
  softwareChangeRecordId: string;
  description: string;
  priority: string;
  status: string;
};

export type SwcrSignature = {
  softwareChangeRecordNo: string;
  ranking: string;
  signatureRole: string;
  functionalRole: string;
  sequence: string;
  signedDate: string;
  status: string;
  softwareChangeRecordId: string;
};
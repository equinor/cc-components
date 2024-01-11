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
  commissioningStatus: string | null;
  mechanicalCompletionPackageNo: string | null;
  mechanicalCompletionPackageId: string | null;
  mechanicalCompletionUrlId: string | null;
  mechanicalCompletionResponsible: string | null;
  mechanicalCompletionStatus: string | null;
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
  heatTraceCableUrl: string | null;
  commissioningPackageUrl: string | null;
  mechanicalCompletionUrl: string | null;
  switchboard: string | null;
  circuit: string | null;
  checklistStep: string | null;
  checklistStepSequence: number | null;
  formStatus: 'OK' | 'OS' | 'PA' | 'PB' | 'IN' | null;
  isExposed: number | null;
  dueDateTimePeriod: string | null;
  isOverdue: string | null;
};

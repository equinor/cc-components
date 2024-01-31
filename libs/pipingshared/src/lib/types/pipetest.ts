export type Pipetest = {
  id: string;
  pipetestType: string;
  facility: string;
  project: string;
  location: string;
  description: string;
  rfCPlannedForecastDate: string;
  m03PlannedForecastDate: string;
  signedDate: string;
  mechanicalCompletionUrlId: string;
  mechanicalCompletionResponsible: string;
  mechanicalCompletionStatus: string;
  mechanicalCompletionId: string;
  commissioningPackageUrlId: string;
  commissioningResponsible: string;
  commissioningStatus: string;
  dueDateTimePeriod: string;
  isOverdue: string;
  checklistStep: string;
  formStatus: string;
  checklistStepSequence: number;
  priority1: string;
  projectDescription: string;
  projectSchema?: string;
  heatTraceCableId: string;
  heatTraceCableNo: string;
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
};

export type InsulationTag = {
  tagNo: string;
  description: string;
  status: string;
};

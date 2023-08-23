export type Workorder = {
  actualCompletionDate: string | null;
  description: string | null;
  discipline: string | null;
  disciplineDescription: string | null;
  estimatedManHours: number | null;
  facility: string | null;
  holdBy: string | null;
  jobStatus: string | null;
  loopId: string | null;
  loopNo: string | null;
  materialStatus: string | null;
  plannedCompletionDate: string | null;
  project: string | null;
  projectProgress: number | null;
  remainingManHours: number | null;
  responsible: string | null;
  responsibleDescription: string | null;
  title: string | null;
  workOrderId: string;
  workOrderNo: string;
  workOrderUrl: string | null;
  workOrderUrlId: string | null;
};

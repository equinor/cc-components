export type WorkorderBase = {
  actualCompletionDate: string | null;
  discipline: string | null;
  estimatedManHours: number | null;
  expendedManHours?: number | null;
  jobStatus: string | null;
  plannedCompletionDate: string | null;
  projectProgress: number | null;
  remainingManHours: number | null;
  title: string | null;
  workOrderId: string;
  workOrderNo: string;
  workOrderUrl: string | null;
};

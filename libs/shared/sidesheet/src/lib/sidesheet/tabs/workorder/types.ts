export type WorkorderBase = {
  workOrderNo: string;
  workOrderId: string;
  workOrderUrlId: string;
  description: string | null;
  plannedCompletionDate: string | null;
  actualCompletionDate: string | null;
  discipline: string | null;
  estimatedManHours: number | null;
  expendedManHours?: number | null;
  remainingManHours: number | null;
  jobStatus: string | null;
  projectProgress: number | null;
};

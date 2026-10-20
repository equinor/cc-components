export type McWorkOrder = {
  actualCompletionDate: string | null;
  discipline: string | null;
  estimatedManHours: number | null;
  expendedManHours?: number | null;
  jobStatus: string | null;
  plannedCompletionDate: string | null;
  projectProgress: number | null;
  remainingManHours: number | null;
  description: string | null;
  workOrderId: string;
  workOrderNumber: string;
  url: string;
};

export type WorkorderBase = {
  actualCompletionDate: string | null;
  discipline: string | null;
  estimatedHours: number | null;
  expendedHours?: number | null;
  jobStatus: string | null;
  plannedFinishDate: string | null;
  projectProgress: number | null;
  remainingHours: number | null;
  title: string | null;
  workOrderUrlId: string;
  workOrderNumber: string;
  workOrderUrl: string | null;
};

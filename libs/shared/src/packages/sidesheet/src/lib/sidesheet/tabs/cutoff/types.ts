export type CutoffBase = {
  cutoffWeek: string;
  title: string | null;
  project: string | null;
  commissioningPackageNo: string | null;
  location: string | null;
  holdBy: string | null;
  plannedStartupDate: string | null;
  plannedCompletionDate: string | null;
  milestone: string;
  subMilestone: string | null;
  responsible: string | null;
  projectProgress: number | null;
  estimatedManHours: number;
  expendedManHours: number;
  remainingManHours: string | null;
  earnedManHours: number;
  expendedManHoursLastWeek: number;
  earnedManHoursLastWeek: number;
};

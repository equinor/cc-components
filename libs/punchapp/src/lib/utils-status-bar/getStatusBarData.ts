import { Punch } from "@cc-components/punchshared";

type Kpi = {
  totalPunch: number;
  openPB: number;
  openPA: number;
  openPunch: number;
  cleared: number;
};
type PartialKpi = Pick<Kpi, 'openPB' | 'openPA' | 'cleared'>;
export const getStatusBarData = (data: Punch[]): Kpi => {
  const counts = data.reduce(
    (acc, curr) => {
      if (curr.clearedAtDate) {
        acc.cleared += 1;
      } else {
        if (curr.category === 'PB') {
          acc.openPB += 1;
        } else {
          acc.openPA += 1;
        }
      }

      return acc;
    },
    { cleared: 0, openPA: 0, openPB: 0 } as PartialKpi
  );

  return {
    ...counts,
    openPunch: counts.openPA + counts.openPB,
    cleared: Number(((counts.cleared / data.length) * 100).toFixed(2)),
    totalPunch: data.length,
  };
};

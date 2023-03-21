import { McPackage } from '@cc-components/mechanicalcompletionshared';

type Kpi = {
  mcPkgsCount: number;
  finalPunchCount: number;
  punchAcceptedCount: number;
  mcToComCount: number;
  rfccCount: number;
  rfccPercentage: number;
};
export const getStatusBarData = (mcPackages: McPackage[]): Kpi => {
  const counts = mcPackages.reduce(
    (acc, curr) => {
      // Final Punch
      if (curr.finalPunchActualDate) {
        acc.finalPunchCount += 1;
      }

      // Punch status Accepted
      if (curr?.punchAcceptActualDate) {
        acc.punchAcceptedCount += 1;
      }

      //MC to Com
      if (curr.rfccForecastDate || curr.rfccPlannedDate) {
        acc.mcToComCount += 1;
      }

      // RFCC
      if (curr.rfccActualDate) {
        acc.rfccCount += 1;
      }
      return acc;
    },
    {
      finalPunchCount: 0,
      mcToComCount: 0,
      punchAcceptedCount: 0,
      rfccCount: 0,
    } as Omit<Kpi, 'rfccPercentage' | 'mcPkgsCount'>
  );

  return {
    ...counts,
    mcPkgsCount: mcPackages.length,
    rfccPercentage: (counts.rfccCount / mcPackages.length) * 100,
  };
};

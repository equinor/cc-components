import { SwcrPackage } from '@cc-components/swcrshared';

type Kpi = {
  allSwcrs: number;
  openSwcrs: number;
  closedSwcrs: number;
  percentageClosedSwcrs: string;
};
type PartialKpi = Pick<Kpi, 'openSwcrs' | 'closedSwcrs'>;
export const getStatusBarData = (swcrs: SwcrPackage[]): Kpi => {
  const counts = swcrs.reduce(
    (acc, curr) => {
      if (curr.status !== 'Closed' && curr.status !== 'Closed - Rejected') {
        acc.openSwcrs += 1;
      }

      if (curr.status === 'Closed' || curr.status === 'Closed - Rejected') {
        acc.closedSwcrs += 1;
      }

      return acc;
    },
    {
      openSwcrs: 0,
      closedSwcrs: 0,
    } as PartialKpi
  );

  return {
    ...counts,
    allSwcrs: swcrs.length,
    percentageClosedSwcrs: ((counts.closedSwcrs / swcrs.length) * 100).toFixed(1),
  };
};

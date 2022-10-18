import { numberFormat } from '@cc-components/shared';
import { Punch } from '../types';
import { getStatusBarData } from '../utils-status-bar';
//TODO: Add StatusItem[] as return type
export const statusBarConfig = (data: Punch[]) => {
  const kpis = getStatusBarData(data);
  return [
    {
      title: 'Total punch',
      value: () => numberFormat(kpis.totalPunch),
    },
    {
      title: 'Open PB',
      value: () => numberFormat(kpis.openPB),
    },
    {
      title: 'Open PA',
      value: () => numberFormat(kpis.openPA),
    },
    {
      title: 'Open punch',
      value: () => numberFormat(kpis.openPunch),
    },
    {
      title: 'Cleared',
      value: () => `${kpis.cleared}%`,
    },
  ];
};

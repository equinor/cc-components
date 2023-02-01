import { Punch } from '@cc-components/punchshared';
import { numberFormat } from '@cc-components/shared';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { getStatusBarData } from '../utils-status-bar';
export const statusBarConfig: StatusBarConfig<Punch> = (data) => {
  const kpis = getStatusBarData(data);
  return [
    {
      title: 'Total punch',
      value: numberFormat(kpis.totalPunch),
    },
    {
      title: 'Open PB',
      value: numberFormat(kpis.openPB),
    },
    {
      title: 'Open PA',
      value: numberFormat(kpis.openPA),
    },
    {
      title: 'Open punch',
      value: numberFormat(kpis.openPunch),
    },
    {
      title: 'Cleared',
      value: `${kpis.cleared}%`,
    },
  ];
};

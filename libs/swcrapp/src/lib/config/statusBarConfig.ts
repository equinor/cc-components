import { numberFormat } from '@cc-components/shared/utils-formatting';
import { SwcrPackage } from '@cc-components/swcrshared';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { getStatusBarData } from '../utils-status-bar';

export const statusBarConfig: StatusBarConfig<SwcrPackage> = (data) => {
  const kpis = getStatusBarData(data);

  return [
    {
      title: 'Total SWCRs',
      value: numberFormat(kpis.allSwcrs),
    },
    {
      title: 'Open',
      value: numberFormat(kpis.openSwcrs),
    },
    {
      title: 'Closed',
      value: numberFormat(kpis.closedSwcrs),
    },
    {
      title: '% Closed',
      value: `${kpis.percentageClosedSwcrs}%`,
    },
  ];
};

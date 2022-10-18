import { numberFormat } from '@cc-components/shared';
import { SwcrPackage } from '../types';
import { getStatusBarData } from '../utils-status-bar';

// TODO: Add correct return type
export const statusBarConfig = (data: SwcrPackage[]) => {
  const kpis = getStatusBarData(data);

  return [
    {
      title: 'Total SWCRs',
      value: () => numberFormat(kpis.allSwcrs),
    },
    {
      title: 'Open',
      value: () => numberFormat(kpis.openSwcrs),
    },
    {
      title: 'Closed',
      value: () => numberFormat(kpis.closedSwcrs),
    },
    {
      title: '% Closed',
      value: () => `${kpis.percentageClosedSwcrs}%`,
    },
  ];
};

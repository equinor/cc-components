import { numberFormat } from '@cc-components/shared';
import { WorkOrder } from '../types';
import { getStatusBarData } from '../utils-status-bar';

//TODO: Add StatusItem[] return type
export const statusBarConfig = (data: WorkOrder[]) => {
  const kpis = getStatusBarData(data);
  return [
    {
      title: 'Mhrs total',
      value: () => numberFormat(kpis.estMhrs),
    },
    {
      title: 'Mhrs not available',
      value: () => numberFormat(kpis.remMhrsNotAvailable),
    },
    {
      title: 'Mhrs available',
      value: () => numberFormat(kpis.remMhrsAvailable),
    },
    {
      title: 'Mhrs ready for execution',
      value: () => numberFormat(kpis.remMhrsWoOk),
    },
    {
      title: 'Mhrs expended',
      value: () => numberFormat(kpis.expMhrsCompleted),
    },
    {
      title: 'Mhrs remaining',
      value: () => numberFormat(kpis.remMhrs),
    },
  ];
};

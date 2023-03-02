import { numberFormat } from '@cc-components/shared/utils-formatting';
import { WorkOrder } from '@cc-components/workordershared';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { getStatusBarData } from '../utils-status-bar';

export const statusBarConfig: StatusBarConfig<WorkOrder> = (data) => {
  const kpis = getStatusBarData(data);
  return [
    {
      title: 'Mhrs total',
      value: numberFormat(kpis.estMhrs),
    },
    {
      title: 'Mhrs not available',
      value: numberFormat(kpis.remMhrsNotAvailable),
    },
    {
      title: 'Mhrs available',
      value: numberFormat(kpis.remMhrsAvailable),
    },
    {
      title: 'Mhrs ready for execution',
      value: numberFormat(kpis.remMhrsWoOk),
    },
    {
      title: 'Mhrs expended',
      value: numberFormat(kpis.expMhrsCompleted),
    },
    {
      title: 'Mhrs remaining',
      value: numberFormat(kpis.remMhrs),
    },
  ];
};

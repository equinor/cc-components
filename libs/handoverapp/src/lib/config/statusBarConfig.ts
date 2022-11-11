import { numberFormat } from '@cc-components/shared';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { HandoverPackage } from '../types';
import { getStatusBarData } from '../utils-status-bar';
export const statusBarConfig: StatusBarConfig<HandoverPackage> = (data) => {
  const statusData = getStatusBarData(data);

  return [
    {
      title: 'Total CP',
      value: numberFormat(data.length),
    },
    {
      title: 'RFO Accepted',
      value: numberFormat(statusData['RFOC Accepted']),
    },
    {
      title: 'RFO Sent',
      value: numberFormat(statusData['RFOC Sent']),
    },
    {
      title: 'RFO Partly',
      value: statusData['RFOC Partly'].toString(),
    },
    {
      title: 'RFO OS',
      value: numberFormat(statusData.OS),
    },

    {
      title: 'RFO vs target',
      value: numberFormat(
        statusData['RFOC Accepted'] + statusData['RFOC Sent'] - statusData.targetSum
      ),
    },
    {
      title: 'RFO overdue',
      value: numberFormat(statusData.overdue),
    },
    {
      title: 'RFO %',
      value: `${(
        ((statusData['RFOC Accepted'] + statusData['RFOC Sent']) / data.length) *
        100
      ).toFixed(1)}%`,
    },
  ];
};

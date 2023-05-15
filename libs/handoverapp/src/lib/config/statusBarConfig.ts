import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

export const useStatusBarConfig = (contextId: string): StatusBarConfig<unknown[]> => {
  const client = useHttpClient('cc-app');

  return async (filters, signal) => {
    const res = await client.fetch(`/api/contexts/${contextId}/handover/kpis`, {
      method: 'POST',
      body: JSON.stringify({
        filter: filters,
      }),
      signal,
      headers: {
        ['content-type']: 'application/json',
      },
    });
    return (await res.json()).map((s: any) => ({ ...s, title: s.name }));
  };
};

export const statusBarConfig = {};

/*
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
*/
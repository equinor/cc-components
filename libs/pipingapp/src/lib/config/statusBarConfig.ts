import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { Pipetest } from 'libs/pipingshared/dist/src';

export const useStatusBarConfig = (contextId: string): StatusBarConfig<Pipetest[]> => {
  const client = useHttpClient('cc-api');

  return async (filters, signal) => {
    const res = await client.fetch(`/api/contexts/${contextId}/loop/kpis`, {
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

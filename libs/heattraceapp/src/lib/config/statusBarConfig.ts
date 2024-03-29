import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { useHttpClient } from '@cc-components/shared';

export const useStatusBarConfig = (contextId: string): StatusBarConfig => {
  const client = useHttpClient();

  return async (filters, signal) => {
    const res = await client.fetch(`/api/contexts/${contextId}/heat-trace/kpis`, {
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

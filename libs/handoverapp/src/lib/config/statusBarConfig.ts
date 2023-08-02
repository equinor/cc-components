import { useHttpClient } from '@cc-components/shared';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';

export const useStatusBarConfig = (contextId: string): StatusBarConfig => {
  const client = useHttpClient();

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

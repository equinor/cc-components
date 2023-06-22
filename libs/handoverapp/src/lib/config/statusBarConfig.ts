import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

export const useStatusBarConfig = (contextId: string): StatusBarConfig => {
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

import { ElectricalNetwork, useContextId, useHttpClient } from '@cc-components/shared';

import { useQuery } from '@tanstack/react-query';

export const useElectricalNetworks = (facility: string, tagNos: string[]) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<ElectricalNetwork[], Error>({
    queryKey: [facility, tagNos.join(','), 'electrical-networks'],
    queryFn: async ({ signal }) => {
      const url = `api/contexts/${contextId}/electrical/electrical-network/${facility}`;

      const res = await client.fetch(url, {
        method: 'POST',
        signal,
        body: JSON.stringify({ tagNos }),
        headers: {
          ['content-type']: 'application/json',
        },
      });

      if ([204, 404].includes(res.status)) {
        return null;
      }

      if (!res.ok) {
        throw new Error('Failed to get elenetwork', { cause: res });
      }

      return res.json();
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};

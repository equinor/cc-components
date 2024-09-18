import { ElectricalNetwork, useContextId, useHttpClient } from '@cc-components/shared';

import { useQuery } from '@tanstack/react-query';

export const useElectricalNetworks = (pipetestId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<ElectricalNetwork[], Error>({
    queryKey: [pipetestId, 'electrical-networks'],
    queryFn: async ({ signal }) => {
      const url = `api/contexts/${contextId}/pipetest/${pipetestId}/electrical-networks`;

      const res = await client.fetch(url, { signal, });

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

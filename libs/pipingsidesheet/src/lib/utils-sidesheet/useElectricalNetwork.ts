import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { ElectricalNetwork, useContextId } from '@cc-components/shared';

import { useQuery } from '@tanstack/react-query';

export const useElectricalNetworks = (facility: string, tagNos: string[]) => {
  const client = useHttpClient('electrical-api');
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<ElectricalNetwork[], Error>(
    [facility, tagNos],
    async ({ signal }) => {
      const url = `api/contexts/${contextId}/electrical/consumers/electrical-network/${facility}`;

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
        throw new Error('Failed to fetch elenetwork');
      }

      return res.json();
    }
  );

  return {
    data,
    isLoading,
    error,
  };
};

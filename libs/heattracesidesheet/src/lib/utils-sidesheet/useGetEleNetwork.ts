import { ElectricalNetwork, useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { HeatTrace } from '@cc-components/heattraceshared';

export const useGetEleNetwork = (ht?: HeatTrace) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isPending, error } = useQuery<ElectricalNetwork | null>({
    queryKey: [
      'heattrace-electrical-network',
      ht?.heatTraceCableNo,
      ht?.facility,
      ht?.project,
    ],
    queryFn: async ({ signal }) => {
      if (!ht) {
        throw new Error('The heat trace should not be null');
      }
      const res = await client.fetch(
        `api/contexts/${contextId}/heat-trace/${encodeURIComponent(
          ht.heatTraceCableId
        )}/electrical-network`,
        { signal }
      );

      if (res.status === 204) {
        return null;
      }

      if (!res.ok) {
        if (res.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch elenetwork');
      }
      return res.json();
    },
    throwOnError: false,
    enabled: !!ht,
  });

  return {
    eleNetwork: data,
    isPendingEleNetwork: isPending,
    errorEleNetwork: error,
  };
};

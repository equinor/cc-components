import { ElectricalNetwork, useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { HeatTrace } from '@cc-components/heattraceshared';

export const useGetEleNetwork = (ht: HeatTrace) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<ElectricalNetwork | null>({
    queryKey: [ht.heatTraceCableNo, ht.facility, ht.project],
    queryFn: async ({ signal }) => {
      const res = await client.fetch(
        `api/contexts/${contextId}/electrical/electrical-network/${encodeURIComponent(
          ht.heatTraceCableNo
        )}/${ht.facility}`,
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
  });

  return {
    eleNetwork: data,
    isLoadingEleNetwork: isLoading,
    errorEleNetwork: error,
  };
};

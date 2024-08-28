import { useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { HeatTraceHeatedTag } from '@cc-components/heattraceshared';

export const useGetHeatedTags = (heatTraceCableId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<HeatTraceHeatedTag[], Error>({
    queryKey: ['heat-trace', heatTraceCableId, 'heated-tags'],
    queryFn: async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/heat-trace/${heatTraceCableId}/heated-tags`,
        { signal }
      );
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    },
  });

  return {
    dataHeatedTags: data,
    isLoadingHeatedTags: isLoading,
    errorHeatedTags: error,
  };
};

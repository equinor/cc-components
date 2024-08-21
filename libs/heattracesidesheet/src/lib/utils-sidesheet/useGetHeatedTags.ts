import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { HeatTraceHeatedTag } from '@cc-components/heattraceshared';

export const useGetHeatedTags = (heatTraceCabelId: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<HeatTraceHeatedTag[], Error>({
    queryKey: ['heat-trace', heatTraceCabelId, 'heated-tags'],
    queryFn: async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/heat-trace/${heatTraceCabelId}/heated-tags`,
        { signal }
      );
      if (!respons.ok) {
        throw new Error();
      }
      return respons.json();
    },
  });

  return {
    dataHeatedTags: data,
    isLoadingHeatedTags: isLoading,
    errorHeatedTags: error,
  };
};

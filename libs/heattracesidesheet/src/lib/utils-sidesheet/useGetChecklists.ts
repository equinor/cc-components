import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { HeatTraceChecklist } from '@cc-components/heattraceshared';

export const useGetHeatTraceChecklists = (heatTraceCabelId: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  
  const { data, isLoading, error } = useQuery<HeatTraceChecklist[], Error>({
    queryKey: ['heat-trace', heatTraceCabelId, 'checklists'],
    queryFn: async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/heat-trace/${heatTraceCabelId}/checklists`,
        { signal }
      );
      if (!respons.ok) {
        throw new Error();
      }
      return respons.json();
    },
  });

  return {
    dataChecklists: data,
    isLoadingChecklists: isLoading,
    errorChecklists: error,
  };
};

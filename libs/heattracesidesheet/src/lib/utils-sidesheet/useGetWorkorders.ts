import { WorkorderBase, useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkorders = (heatTraceCabelId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<WorkorderBase[], Error>(
    ['heat-trace', heatTraceCabelId, 'workorders'],
    async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/heat-trace/${heatTraceCabelId}/work-orders`,
        { signal }
      );
      if (response.status === 204) {
        return null;
      }
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }
  );

  return {
    dataWorkorders: data,
    isLoadingWorkorders: isLoading,
    errorWorkorders: error,
  };
};

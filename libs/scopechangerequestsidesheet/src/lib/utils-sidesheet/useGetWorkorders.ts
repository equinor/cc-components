import { WorkorderBase, useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkorders = (scopeChangeRequestId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();
  
  const { data, isLoading, error } = useQuery<WorkorderBase[], Error>({
    queryKey: ['scope-change-request', scopeChangeRequestId, 'workorders'],
    queryFn: async ({ signal }) => {
      const response = await client.fetch(
        `/api/scope-change-requests/${scopeChangeRequestId}/work-orders`,
        { signal, headers: { ['x-fusion-context-id']: contextId } }
      );
      if (response.status === 204) {
        return null;
      }
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    },
  });

  return {
    dataWorkorders: data,
    isLoadingWorkorders: isLoading,
    errorWorkorders: error,
  };
};

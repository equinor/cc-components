import { WorkorderBase, useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkorders = (pipetestId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<WorkorderBase[], Error>(
    ['pipetest', pipetestId, 'work-orders'],
    async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/pipetest/${pipetestId}/work-orders`,
        { signal }
      );
      if (!response.ok) {
        throw new Error('Failed to get work-orders', { cause: response });
      }
      return response.json();
    }
  );

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
};

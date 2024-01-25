import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { WorkorderBase, useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkorders = (pipetestName?: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<WorkorderBase[], Error>(
    ['pipetest', pipetestName, 'workorders'],
    async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/pipetest/${pipetestName}/work-orders`,
        { signal }
      );
      if (!response.ok) {
        throw new Error();
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

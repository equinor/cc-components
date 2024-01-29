import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { WorkorderBase, useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkorders = (pipetestId: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<WorkorderBase[], Error>(
    ['pipetest', pipetestId, 'work-orders'],
    async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/pipetest/${pipetestId}/work-orders`,
        { signal }
      );
      if (!respons.ok) {
        throw new Error();
      }
      return respons.json();
    }
  );

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
};

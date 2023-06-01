import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { Workorder } from '../types';

export const useGetWorkorders = (pipetestName: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<Workorder[], Error>(
    ['piping', pipetestName, 'workorders'],
    async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/piping/${pipetestName}/workorders`,
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

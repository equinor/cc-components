import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { Workorder } from '../types';

export const useGetWorkorders = (heatTraceCabelNo: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<Workorder[], Error>(
    ['heat-trace', heatTraceCabelNo, 'workorders'],
    async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/heat-trace/${heatTraceCabelNo}/workorders`,
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

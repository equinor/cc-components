import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { WorkorderBase, useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { Workorder } from '../types';

export const useGetWorkorders = (heatTraceCabelId: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<WorkorderBase[], Error>(
    ['heat-trace', heatTraceCabelId, 'workorders'],
    async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/heat-trace/${heatTraceCabelId}/work-orders`,
        { signal }
      );
      if (!respons.ok) {
        throw new Error();
      }
      return respons.json();
    }
  );

  return {
    dataWorkorders: data,
    isLoadingWorkorders: isLoading,
    errorWorkorders: error,
  };
};

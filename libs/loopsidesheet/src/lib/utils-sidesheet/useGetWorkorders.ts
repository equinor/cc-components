import { WorkorderBase, useContextId } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkorders = (loopNo: string | undefined) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  
  const { data, isLoading, error } = useQuery<WorkorderBase[], Error>({
    queryKey: ['loop', loopNo, 'workorders'],
    queryFn: async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/loop/${loopNo}/workorders`,
        { signal }
      );
      if (!respons.ok) {
        throw new Error();
      }
      return respons.json();
    },
    enabled: !!loopNo,
  });

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
};

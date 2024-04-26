import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { LoopContent } from '../types';

export const useGetLoopContent = (loopNo: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  
  const { data, isLoading, error } = useQuery<LoopContent[], Error>({
    queryKey: ['loop', loopNo, 'content'],
    queryFn: async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/loop/${loopNo}/content`,
        { signal }
      );
      if (!respons.ok) {
        throw new Error();
      }
      return respons.json();
    },
  });

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
};

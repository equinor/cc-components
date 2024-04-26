import { useContextId, useHttpClient } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { InsulationTagResponse } from '@cc-components/pipingshared';

export const useGetInsulationTags = (pipetestId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<InsulationTagResponse, Error>({
    queryKey: ['pipetest', pipetestId, 'insulation-tags'],
    queryFn: async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/pipetest/${pipetestId}/insulation-tags`,
        { signal }
      );
      if (!response.ok) {
        throw new Error('Failed to get insulation-tags', { cause: response });
      }
      return response.json();
    },
  });

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
};

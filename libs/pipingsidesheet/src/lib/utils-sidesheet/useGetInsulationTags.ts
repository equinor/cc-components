import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { InsulationTagResponse } from '@cc-components/pipingshared';

export const useGetInsulationTags = (pipetestId: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<InsulationTagResponse, Error>(
    ['pipetest', pipetestId, 'insulation-tags'],
    async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/pipetest/${pipetestId}/insulation-tags`,
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

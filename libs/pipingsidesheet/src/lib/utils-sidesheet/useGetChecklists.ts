import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { Checklist } from '@cc-components/pipingshared';

export const useGetChecklists = (pipetestId?: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<Checklist[], Error>(
    ['pipetest', pipetestId, 'checklists'],
    async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/pipetest/${pipetestId}/checklists`,
        { signal }
      );
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }
  );

  return { data, isLoading, error };
};

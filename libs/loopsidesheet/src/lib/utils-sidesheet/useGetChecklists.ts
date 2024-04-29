import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { ChecklistForLoop } from '../types';

export const useGetChecklists = (loopId: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();
  const { data, isLoading, error } = useQuery<ChecklistForLoop[], Error>(
    ['loop', loopId, 'checklist'],
    async ({ signal }) => {
      const respons = await client.fetch(
        `/api/contexts/${contextId}/loop/${loopId}/checklists`,
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

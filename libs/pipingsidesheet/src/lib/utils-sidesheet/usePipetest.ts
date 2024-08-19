import { useContextId, useHttpClient } from '@cc-components/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Pipetest } from '@cc-components/pipingshared';

export const useGetPipetest = (pipetestId: string, initialData?: Pipetest) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isLoading, error } = useSuspenseQuery<Pipetest>({
    queryKey: ['pipetest', pipetestId],
    queryFn: async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/pipetest/${pipetestId}`);
      if (!res.ok) {
        throw res;
      }
      return res.json();
    },
    initialData: initialData ?? undefined,
  });

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
};


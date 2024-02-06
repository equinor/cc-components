import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { Pipetest } from '@cc-components/pipingshared';


export const useGetPipetest = (pipetestId: string, initialData?: Pipetest) => {
    const client = useHttpClient('cc-api');
    const contextId = useContextId();
  
    const { data, isLoading, error } = useQuery<Pipetest>(
        ['pipetest', pipetestId],
        async () => {
          const res = await client.fetch(`/api/contexts/${contextId}/pipetest/${pipetestId}`);
          if (!res.ok) {
            throw res;
          }
          return res.json();
        },
        {
          suspense: true,
          initialData: initialData ?? undefined,
          useErrorBoundary: false
        }
    );
  
    return {
      data: data,
      isLoading: isLoading,
      error: error,
    };
  };
  
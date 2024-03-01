import { useContextId } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';

export const useGetEchoConfig = (packageId: string) => {
  const client = useHttpClient('cc-app');
  const contextId = useContextId();

  const { data, isFetching, error } = useQuery<EchoConfig>({
    queryKey: ['model-tags', packageId],
    queryFn: async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/work-orders/${packageId}/echo`,
        { signal }
      );

      if (!response.ok) {
        throw new Error('Failed to get model tags', { cause: response });
      }

      return response.json();
    },
  });

  return {
    data,
    isFetching,
    error,
  };
};

export type EchoConfig = {
  facilities: string[];
  tags: EchoTag[];
};

export type EchoTag = {
  tagNo: string;
  description: string;
  status: string;
};

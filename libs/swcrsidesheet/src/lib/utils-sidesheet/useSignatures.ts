import { useHttpClient } from '@cc-components/shared';
import { useContextId } from '@cc-components/shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { SwcrSignature } from '../types';

type UseSignatures = {
  data: SwcrSignature[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const useSignatures = (swcrId: string): UseSignatures => {
  const contextId = useContextId();
  const client = useHttpClient();

  const { isLoading, data, error } = useQuery<SwcrSignature[], Error>(
    ['swcr', swcrId],
    async () => {
      const res = await client.fetch(
        `api/contexts/${contextId}/swcr/${swcrId}/signatures`
      );
      if (!res.ok) {
        throw new Error(`Failed to get signatures for swcr with id ${swcrId}`);
      }
      return res.json() as Promise<SwcrSignature[]>;
    },
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    error,
  };
};

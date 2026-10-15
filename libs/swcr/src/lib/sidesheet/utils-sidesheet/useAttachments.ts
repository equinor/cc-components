import { useHttpClient } from '@cc-components/shared';
import { useContextId } from '@cc-components/shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { SwcrAttachment } from '../types';

type UseAttachments = {
  data: SwcrAttachment[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const useAttachments = (swcrId: string | null | undefined): UseAttachments => {
  const contextId = useContextId();
  const client = useHttpClient();

  const { isLoading, data, error } = useQuery<SwcrAttachment[], Error>({
    queryKey: ['swcr', 'attachments', swcrId],
    queryFn: async () => {
      if (!swcrId) {
        return [];
      }
      const res = await client.fetch(
        `api/contexts/${contextId}/swcr/${swcrId}/attachments`
      );
      if (!res.ok) {
        throw new Error(`Failed to get attachments for swcr with id ${swcrId}`);
      }
      return res.json() as Promise<SwcrAttachment[]>;
    },
    enabled: !!swcrId,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};

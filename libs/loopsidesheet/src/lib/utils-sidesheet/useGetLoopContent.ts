import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import { LoopContent } from '../types';

type McStatus = "OS" | "PB" | "PA" | "OK";

const sortOrderMcStatusRanks: Record<McStatus, number> = {
  "OS": 1,
  "PB": 2,
  "PA": 3,
  "OK": 4
};

const compareMcStatus = (x: McStatus | undefined | null, y: McStatus | undefined | null): number => {
  const xRank = x ? sortOrderMcStatusRanks[x] : -1;
  const yRank = y ? sortOrderMcStatusRanks[y] : -1;
  return xRank - yRank;
};

export const useGetLoopContent = (loopNo: string) => {
  const client = useHttpClient('cc-api');
  const contextId = useContextId();

  const { data, isLoading, error } = useQuery<LoopContent[], Error>({
    queryKey: ['loop', loopNo, 'content'],
    queryFn: async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/loop/${loopNo}/content`,
        { signal }
      );
      if (!response.ok) {
        throw new Error();
      }
      const loopContent = await response.json() as LoopContent[]
      return loopContent.sort((a, b) => {
        return compareMcStatus(a.mechanicalCompletionStatus as McStatus | undefined, b.mechanicalCompletionStatus as McStatus | undefined)
      })
    },
  });

  return {
    data: data,
    isLoading: isLoading,
    error: error,
  };
};

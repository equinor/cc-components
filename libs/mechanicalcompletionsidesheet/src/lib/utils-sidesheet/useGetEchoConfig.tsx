import { useContextId } from '@cc-components/shared';
import { useHttpClient } from '@cc-components/shared';
import { TagOverlay } from '@cc-components/modelviewer';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Icon = styled.h3`
  overflow: hidden;
`;

export const useGetEchoConfig = (packageId: string) => {
  const client = useHttpClient();
  const contextId = useContextId();

  const { data, isFetching, error } = useQuery<EchoConfig>({
    queryKey: ['model-tags', packageId],
    queryFn: async ({ signal }) => {
      const response = await client.fetch(
        `/api/contexts/${contextId}/mechanical-completion/${packageId}/echo`,
        { signal }
      );

      if (!response.ok) {
        throw new Error('Failed to get model tags', { cause: response });
      }

      return response.json();
    },
  });

  const tagsOverlay: TagOverlay[] | undefined = data?.tags?.map((tag) => ({
    tagNo: tag.tagNo,
    description: tag.description,
    status: tag.status,
    icon: <Icon>{tag.status}</Icon>,
  }));

  return {
    data,
    tagsOverlay: tagsOverlay ?? [],
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

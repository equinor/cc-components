import { Pipetest } from '@cc-components/pipingshared';
import { useHttpClient } from '@cc-components/shared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { GardenItem } from '../ui-garden';

export const useGardenConfig = (
  contextId: string
): GardenConfig<Pipetest, FilterState> => {
  const client = useHttpClient();
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (req) =>
        client.fetch(`/api/contexts/${contextId}/piping/garden`, req),
      getGardenMeta: (req) =>
        client.fetch(`/api/contexts/${contextId}/piping/garden-meta`, req),
      getHeader: (req) => client.fetch(`/api/contexts/${contextId}/piping/garden`, req),
      getSubgroupItems: (req) =>
        client.fetch(`/api/contexts/${contextId}/piping/subgroup-items`, req),
    });

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.name,
    initialGrouping: ['Responsible'],
    customViews: {
      customItemView: GardenItem,
    },
  };
};

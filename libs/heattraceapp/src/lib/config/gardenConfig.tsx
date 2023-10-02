import { HeatTrace } from '@cc-components/heattraceshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { GardenItem } from '../ui-garden/';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { useHttpClient } from '@cc-components/shared';

export const useGardenConfig = (
  contextId: string
): GardenConfig<HeatTrace, FilterState> => {
  const client = useHttpClient();
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (req) =>
        client.fetch(`/api/contexts/${contextId}/heat-trace/garden`, req),
      getGardenMeta: (req) =>
        client.fetch(`/api/contexts/${contextId}/heat-trace/garden-meta`, req),
      getHeader: (req) =>
        client.fetch(`/api/contexts/${contextId}/heat-trace/garden`, req),
      getSubgroupItems: (req) =>
        client.fetch(`/api/contexts/${contextId}/heat-trace/subgroup-items`, req),
    });

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.heatTraceCableNo,
    initialGrouping: ['Priority1'],
    customViews: {
      customItemView: GardenItem,
    },
  };
};

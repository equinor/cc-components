import { Heattrace } from '@cc-components/heattraceshared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { GardenItem } from '../ui-garden/';
import { FilterState } from '@equinor/workspace-fusion/filter';

export const useGardenConfig = (
  contextId: string
): GardenConfig<Heattrace, FilterState> => {
  const client = useHttpClient('cc-api');
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (req) =>
        client.fetch(`/api/contexts/${contextId}/heattrace/garden`, req),
      getGardenMeta: (req) =>
        client.fetch(`/api/contexts/${contextId}/heattrace/garden-meta`, req),
      getHeader: (req) =>
        client.fetch(`/api/contexts/${contextId}/heattrace/garden`, req),
      getSubgroupItems: (req) =>
        client.fetch(`/api/contexts/${contextId}/heattrace/subgroup-items`, req),
    });

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.tagNo,
    initialGrouping: {
      horizontalGroupingAccessor: 'Responsible',
      verticalGroupingKeys: [],
    },
    customViews: {
      customItemView: GardenItem,
    },
  };
};

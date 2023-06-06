import { SoftwareChangeRecord } from '@cc-components/swcrshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { GardenGrouped, GardenHeader, GardenItem } from '../ui-garden';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@cc-components/shared';

export const useGardenConfig = (
  contextId: string
): GardenConfig<SoftwareChangeRecord, FilterStateGroup[]> => {
  const client = useHttpClient();
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (req) => client.fetch(`/api/contexts/${contextId}/swcr/garden`, req),
      getGardenMeta: (req) =>
        client.fetch(`/api/contexts/${contextId}/swcr/garden-meta`, req),
      getHeader: (req) => client.fetch(`/api/contexts/${contextId}/swcr/garden`, req),
      getSubgroupItems: (req) =>
        client.fetch(`/api/contexts/${contextId}/swcr/subgroup-items`, req),
    });

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.softwareChangeRecordNo,
    initialGrouping: {
      horizontalGroupingAccessor: 'CommPkg',
      verticalGroupingKeys: [],
    },
    customViews: {
      customItemView: GardenItem,
      // customHeaderView: GardenHeader,
      // customGroupView: GardenGrouped,
    },
  };
};

import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { SwcrPackage } from '@cc-components/swcrshared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import SwcrItem from '../ui-garden/Item';

export const useGardenConfig = (
  contextId: string
): GardenConfig<SwcrPackage, FilterState> => {
  const client = useHttpClient('cc-api');
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (req) => client.fetch(`/api/contexts/${contextId}/SWCR/garden`, req),
      getGardenMeta: (req) =>
        client.fetch(`/api/contexts/${contextId}/SWCR/garden-meta`, req),
      getHeader: (req) => client.fetch(`/api/contexts/${contextId}/SWCR/garden`, req),
      getSubgroupItems: (req) =>
        client.fetch(`/api/contexts/${contextId}/SWCR/subgroup-items`, req),
    });

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.softwareChangeRecordNo,
    initialGrouping: ['RFC_PlannedDate'],
    visuals: {
      rowHeight: 25,
    },
    customViews: {
      customItemView: SwcrItem,
    },
  };
};

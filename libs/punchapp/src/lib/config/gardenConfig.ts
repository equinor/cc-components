import { Punch } from '@cc-components/punchshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import PunchGardenItem from '../ui-garden/PunchGardenItem';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

export const useGardenConfig = (contextId: string): GardenConfig<Punch, FilterState> => {
  const client = useHttpClient('cc-api');
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (req) =>
        client.fetch(`/api/contexts/${contextId}/punch/garden`, req),
      getGardenMeta: (req) =>
        client.fetch(`/api/contexts/${contextId}/punch/garden-meta`, req),
      getHeader: (req) => client.fetch(`/api/contexts/${contextId}/punch/garden`, req),
      getSubgroupItems: (req) =>
        client.fetch(`/api/contexts/${contextId}/punch/subgroup-items`, req),
    });

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.punchItemNo,
    initialGrouping: ['HandoverPlan'],
    visuals: {
      rowHeight: 31,
    },
    customViews: {
      customItemView: PunchGardenItem as any,
    },
  };
};

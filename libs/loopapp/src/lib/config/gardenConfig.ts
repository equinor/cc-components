import { Loop } from '@cc-components/loopshared';
import { CustomItemView, GardenConfig } from '@equinor/workspace-fusion/garden';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { GardenItem } from '../ui-garden';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';

export const useGardenConfig = (contextId: string): GardenConfig<Loop, FilterState> => {
  const client = useHttpClient('cc-api');
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (req) => client.fetch(`/api/contexts/${contextId}/loop/garden`, req),
      getGardenMeta: (req) =>
        client.fetch(`/api/contexts/${contextId}/loop/garden-meta`, req),
      getHeader: (req) => client.fetch(`/api/contexts/${contextId}/loop/garden`, req),
      getSubgroupItems: (req) =>
        client.fetch(`/api/contexts/${contextId}/loop/subgroup-items`, req),
    });

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.loopNo,
    initialGrouping: ['Responsible'],
    customViews: {
      //bs typescript error
      customItemView: GardenItem as any,
    },
  };
};

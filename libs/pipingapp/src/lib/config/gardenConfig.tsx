import { Pipetest } from '@cc-components/pipingshared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';

export const useGardenConfig = (
  contextId: string
): GardenConfig<Pipetest, FilterStateGroup[]> => {
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
    getDisplayName: (item) => item.name,
    initialGrouping: {
      horizontalGroupingAccessor: 'Responsible',
      verticalGroupingKeys: [],
    },
    customViews: {
      customItemView: GardenItem,
    },
  };
};

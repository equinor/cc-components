import { Loop } from '@cc-components/loopshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { GardenItem } from '../ui-garden';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { CCApiUnauthorizedError, useErrorBoundaryTrigger } from '@cc-components/shared';

export const useGardenConfig = (
  contextId: string
): GardenConfig<Loop, FilterStateGroup[]> => {
  const trigger = useErrorBoundaryTrigger();

  const client = useHttpClient('cc-api');
  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource(
      {
        getBlockAsync: (req) =>
          client.fetch(`/api/contexts/${contextId}/loop/garden`, req),
        getGardenMeta: (req) =>
          client.fetch(`/api/contexts/${contextId}/loop/garden-meta`, req),
        getHeader: (req) => client.fetch(`/api/contexts/${contextId}/loop/garden`, req),
        getSubgroupItems: (req) =>
          client.fetch(`/api/contexts/${contextId}/loop/subgroup-items`, req),
      },
      () => trigger(new CCApiUnauthorizedError(''))
    );

  return {
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    getDisplayName: (item) => item.loopNo,
    initialGrouping: {
      horizontalGroupingAccessor: 'Responsible',
      verticalGroupingKeys: [],
    },
    customViews: {
      customItemView: GardenItem,
    },
  };
};

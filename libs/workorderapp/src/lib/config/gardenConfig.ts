import { WorkOrder } from '@cc-components/workordershared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { GardenItem } from '../ui-garden';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { GardenHeader } from '../ui-garden/GardenHeader';

export const useGardenConfig = (
  contextId: string
): GardenConfig<WorkOrder, FilterState> => {
  const client = useHttpClient('cc-app');

  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (requestArgs) =>
        client.fetch(`/api/contexts/${contextId}/work-orders/garden`, requestArgs),
      getGardenMeta: (requestArgs) =>
        client.fetch(`/api/contexts/${contextId}/work-orders/garden-meta`, requestArgs),
      getHeader: (requestArgs) =>
        client.fetch(`/api/contexts/${contextId}/work-orders/garden`, requestArgs),
      getSubgroupItems: (requestArgs) =>
        client.fetch(
          `/api/contexts/${contextId}/work-orders/subgroup-items`,
          requestArgs
        ),
    });

  return {
    getDisplayName: (item) => item.workOrderNumber,
    initialGrouping: ['FinalizingOfWorkordersAtSite'],
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    customViews: {
      customItemView: GardenItem as any,
      customHeaderView: GardenHeader,
    },
    visuals: {
      rowHeight: 31,
      headerHeight: 42,
    },
  };
};

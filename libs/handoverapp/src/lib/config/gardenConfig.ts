import { HandoverPackage } from '@cc-components/handovershared';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { CustomItemView, GardenConfig } from '@equinor/workspace-fusion/garden';
import { GardenHeader, GardenItem } from '../ui-garden';

export const useGardenConfig = (
  contextId: string
): GardenConfig<HandoverPackage, FilterState> => {
  const client = useHttpClient('cc-app');

  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (requestArgs) =>
        client.fetch(`/api/contexts/${contextId}/handover/garden`, requestArgs),
      getGardenMeta: (requestArgs) =>
        client.fetch(`/api/contexts/${contextId}/handover/garden-meta`, requestArgs),
      getHeader: (requestArgs) =>
        client.fetch(`/api/contexts/${contextId}/handover/garden`, requestArgs),
      getSubgroupItems: (requestArgs) =>
        client.fetch(`/api/contexts/${contextId}/handover/subgroup-items`, requestArgs),
    });

  return {
    getDisplayName: (item) => item.commissioningPackageNo,
    initialGrouping: ['RFOC'],
    initialDateVariant: 'Forecast',
    initialTimeInterval: 'Weekly',
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    customViews: {
      //bs typescript error
      customItemView: GardenItem as any,
      customHeaderView: GardenHeader,
    },
    visuals: {
      rowHeight: 31,
      headerHeight: 42,
    },
  };
};

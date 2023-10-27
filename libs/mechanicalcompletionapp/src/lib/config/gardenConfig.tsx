import { McPackage } from 'libs/mechanicalcompletionshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { GardenItem } from '../ui-garden';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { FilterState } from '@equinor/workspace-fusion/filter';

export const useGardenConfig = (
  contextId: string
): GardenConfig<McPackage, FilterState> => {
  const client = useHttpClient('cc-app');

  const { getBlockAsync, getGardenMeta, getHeader, getSubgroupItems } =
    useGardenDataSource({
      getBlockAsync: (requestArgs) =>
        client.fetch(
          `/api/contexts/${contextId}/mechanical-completion/garden`,
          requestArgs
        ),
      getGardenMeta: (requestArgs) =>
        client.fetch(
          `/api/contexts/${contextId}/mechanical-completion/garden-meta`,
          requestArgs
        ),
      getHeader: (requestArgs) =>
        client.fetch(
          `/api/contexts/${contextId}/mechanical-completion/garden`,
          requestArgs
        ),
      getSubgroupItems: (requestArgs) =>
        client.fetch(
          `/api/contexts/${contextId}/mechanical-completion/subgroup-items`,
          requestArgs
        ),
    });

  return {
    getDisplayName: (item) => item.mechanicalCompletionPackageNo,
    initialGrouping: ['RFCC'],
    initialDateVariant: 'Planned',
    initialTimeInterval: 'Weekly',
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    customViews: {
      customItemView: GardenItem,
      // customHeaderView: GardenHeader,
    },
    visuals: {
      rowHeight: 31,
    },
  };
};

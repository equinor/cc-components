import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { GardenItem } from '../ui-garden';
import { useGardenDataSource } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@cc-components/shared';
import { FilterState } from '@equinor/workspace-fusion/filter';

export const useGardenConfig = (
  contextId: string
): GardenConfig<McPackage, FilterState> => {
  const client = useHttpClient();

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
    initialGrouping: ['M03'],
    initialDateVariant: 'Planned',
    initialTimeInterval: 'Weekly',
    getBlockAsync,
    getGardenMeta,
    getHeader,
    getSubgroupItems,
    customViews: {
      customItemView: GardenItem,
    },
    visuals: {
      rowHeight: 31,
    },
  };
};

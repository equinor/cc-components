import { WorkOrder } from '@cc-components/workordershared';
import { GardenConfig } from '@equinor/workspace-fusion/garden';
import { GardenHeader, GardenItem } from '../ui-garden';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

export const useGardenConfig = (contextId: string): GardenConfig<WorkOrder, unknown> => {
  const client = useHttpClient('cc-app');

  return {
    getDisplayName: (item) => item.workOrderNumber,
    initialGrouping: {
      horizontalGroupingAccessor: 'DisciplineCode',
      verticalGroupingKeys: [],
    },
    getBlockAsync: async (args, filters, signal) => {
      const { columnEnd, columnStart, groupingKeys, rowEnd, rowStart } = args;

      const res = await client.fetch(`/api/contexts/${contextId}/work-orders/garden`, {
        method: 'POST',
        signal,
        headers: {
          ['content-type']: 'application/json',
        },
        body: JSON.stringify({
          columnStart,
          columnEnd,
          rowStart,
          rowEnd,
          groupingKeys,
          filter: filters,
        }),
      });

      return res.json();
    },
    getGardenMeta: async (keys, filters, signal) => {
      const res = await client.fetch(
        `/api/contexts/${contextId}/work-orders/garden-meta`,
        {
          method: 'POST',
          signal,
          headers: {
            ['content-type']: 'application/json',
          },
          body: JSON.stringify({
            groupingKeys: keys,
            filter: filters,
          }),
        }
      );

      const meta = await res.json();

      return {
        ...meta,
        rowCount: meta.subGroupCount > 0 ? meta.subGroupCount : meta.rowCount,
        groupingOptions: meta.allGroupingOptions,
      };
    },
    getHeader: async (args, filters, signal) => {
      const { columnEnd, columnStart, groupingKeys } = args;

      const res = await client.fetch(`/api/contexts/${contextId}/work-orders/garden`, {
        method: 'POST',
        signal,
        headers: {
          ['content-type']: 'application/json',
        },
        body: JSON.stringify({
          columnStart,
          columnEnd,
          rowStart: 0,
          rowEnd: 0,
          groupingKeys,
          filter: filters,
        }),
      });

      return (await res.json()).map((s: any) => ({
        ...s,
        name: s.columnName,
        count: s.totalItemsCount,
      }));
    },
    getSubgroupItems: async (args, filter, signal) => {
      const { columnName, subgroupName, groupingKeys } = args;

      const res = await client.fetch(
        `/api/contexts/${contextId}/work-orders/subgroup-items`,
        {
          method: 'POST',
          signal,
          headers: {
            ['content-type']: 'application/json',
          },
          body: JSON.stringify({
            columnName,
            subGroupName: subgroupName,
            groupingKeys,
            filter: filter,
          }),
        }
      );

      return res.json();
    },

    customViews: {
      customItemView: GardenItem,
      customHeaderView: GardenHeader,
    },
    visuals: {
      rowHeight: 30,
    },
  };
};

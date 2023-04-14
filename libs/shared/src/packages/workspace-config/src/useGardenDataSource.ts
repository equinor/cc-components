import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { GardenDataSource } from '@equinor/workspace-fusion/garden';

type GardenDataSourceArgs = {
  getBlockAsync: (req: RequestInit) => Promise<Response>;
  getGardenMeta: (req: RequestInit) => Promise<Response>;
  getHeader: (req: RequestInit) => Promise<Response>;
  getSubgroupItems: (req: RequestInit) => Promise<Response>;
};

export function useGardenDataSource(
  requestBuilders: GardenDataSourceArgs
): GardenDataSource<FilterStateGroup[]> {
  return {
    getBlockAsync: async (args, filters, signal) => {
      const { columnEnd, columnStart, groupingKeys, rowEnd, rowStart } = args;
      const requestArgs = createRequestBody(
        {
          columnStart,
          columnEnd,
          rowStart,
          rowEnd,
          groupingKeys,
          filter: filters,
        },
        signal
      );

      const res = await requestBuilders.getBlockAsync(requestArgs);
      return res.json();
    },
    getGardenMeta: async (keys, filters, signal) => {
      const requestArgs = createRequestBody(
        {
          groupingKeys: keys,
          filter: filters,
        },
        signal
      );

      const res = await requestBuilders.getGardenMeta(requestArgs);
      const meta = await res.json();
      return {
        ...meta,
        rowCount: meta.subGroupCount > 0 ? meta.subGroupCount : meta.rowCount,
        groupingOptions: meta.allGroupingOptions,
      };
    },
    getHeader: async (args, filters, signal) => {
      const { columnEnd, columnStart, groupingKeys } = args;
      const requestArgs = createRequestBody(
        {
          columnStart,
          columnEnd,
          rowStart: 0,
          rowEnd: 0,
          groupingKeys,
          filter: filters,
        },
        signal
      );
      const res = await requestBuilders.getHeader(requestArgs);
      return (await res.json()).map((s: any) => ({
        ...s,
        name: s.columnName,
        count: s.totalItemsCount,
      }));
    },
    getSubgroupItems: async (args, filter, signal) => {
      const { columnName, subgroupName, groupingKeys } = args;
      const requestArgs = createRequestBody(
        {
          columnName,
          subGroupName: subgroupName,
          groupingKeys,
          filter: filter,
        },
        signal
      );

      const res = await requestBuilders.getSubgroupItems(requestArgs);
      return res.json();
    },
  };
}

const createRequestBody = (body: any, signal?: AbortSignal): RequestInit => ({
  method: 'POST',
  headers: {
    ['content-type']: 'application/json',
  },
  body: JSON.stringify(body),
  signal,
});

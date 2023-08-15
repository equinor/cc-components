import { FilterState } from '@equinor/workspace-fusion/filter';
import { GardenDataSource } from '@equinor/workspace-fusion/garden';

type ApiGardenMeta = {
  startIndex: number | null;
  columnCount: number;
  rowCount: number;
  subGroupCount: number;
  allGroupingOptions: string[];
  validGroupingOptions: string[];
};

type ApiHeader = {
  columnName: string;
  totalItemsCount: number;
};

type GardenDataSourceArgs = {
  getBlockAsync: (req: RequestInit) => Promise<Response>;
  getGardenMeta: (req: RequestInit) => Promise<Response>;
  getHeader: (req: RequestInit) => Promise<Response>;
  getSubgroupItems: (req: RequestInit) => Promise<Response>;
};

export function useGardenDataSource(
  requestBuilders: GardenDataSourceArgs
): GardenDataSource<FilterState> {
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
      if (!res.ok) {
        throw new Error('Api error');
      }
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
      if (!res.ok) {
        throw new Error('Api error');
      }
      const meta: ApiGardenMeta = await res.json();
      return {
        allGroupingOptions: meta.allGroupingOptions.map((s) => ({
          dimension: null,
          type: null,
          groupingKey: s,
        })),
        columnCount: meta.columnCount,
        validGroupingOptions: meta.validGroupingOptions,
        columnStart: meta.startIndex,
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
      if (!res.ok) {
        throw new Error('Api error');
      }
      return (await res.json()).map((s: ApiHeader) => ({
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
      if (!res.ok) {
        throw new Error('Api error');
      }
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

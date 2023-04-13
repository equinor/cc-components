import { GridConfig } from '@equinor/workspace-fusion/grid';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';

type IServerSideRowGetParams = Parameters<GridConfig<unknown, unknown>['getRows']>[0];

/**
 *
 * @param req
 * @returns
 */
export function useGridDataSource<TData>(
  req: (requestArgs: RequestInit) => Promise<TData[]>
) {
  return {
    getRows: async (params: IServerSideRowGetParams, filters: FilterStateGroup[]) => {
      const { startRow, endRow } = params.request;

      const rowData = await req({
        body: JSON.stringify({
          startRow: startRow,
          endRow,
          filter: filters,
        }),
        headers: { ['content-type']: 'application/json' },
        method: 'POST',
      });

      params.success({ rowData: rowData });
      return;
    },
  };
}

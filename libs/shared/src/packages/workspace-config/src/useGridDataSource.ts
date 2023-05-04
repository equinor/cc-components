import { GridConfig } from '@equinor/workspace-fusion/grid';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';

type IServerSideRowGetParams = Parameters<GridConfig<unknown, unknown>['getRows']>[0];

type DataResponse<T> = {
  rowData: T[];
  rowCount: number | undefined;
};

/**
 *
 * @param req
 * @returns
 */
export function useGridDataSource<TData>(
  req: (requestArgs: RequestInit) => Promise<DataResponse<TData>>,
  boundaryTrigger?: VoidFunction
) {
  return {
    getRows: async (params: IServerSideRowGetParams, filters: FilterStateGroup[]) => {
      const { startRow, endRow } = params.request;

      try {
        const response = await req({
          body: JSON.stringify({
            startRow: startRow,
            endRow,
            filter: filters,
          }),
          headers: { ['content-type']: 'application/json' },
          method: 'POST',
        });

        params.success({ rowData: response.rowData, rowCount: response.rowCount });
      } catch (e) {
        boundaryTrigger && boundaryTrigger();
        params.fail();
      }
    },
  };
}

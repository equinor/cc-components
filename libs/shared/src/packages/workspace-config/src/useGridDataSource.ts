import {
  ColDef,
  GridConfig,
  IServerSideGetRowsParams,
} from '@equinor/workspace-fusion/grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { useState } from 'react';
import { useContextId } from '../../hooks/src/lib/useContextId';

type IServerSideRowGetParams = Parameters<GridConfig<unknown, unknown>['getRows']>[0];

export type DataResponse<T> = {
  items: T[];
  rowCount: number | undefined;
  columnDefinitions?: GridColumnOption[];
};

export type GridColumnOption = {
  name: string;
  sortOption: boolean;
  groupOption: boolean;
};
/**
 *
 * @param req
 * @returns
 */
export function useGridDataSource<TData>(
  req: (
    requestArgs: RequestInit,
    params: IServerSideGetRowsParams<any>
  ) => Promise<DataResponse<TData>>,
  columnDefinitions: ColDef<TData>[]
) {
  const [colDefs, setColDefs] = useState<ColDef<TData>[]>(columnDefinitions);
  const contextId = useContextId();

  return {
    colDefs,
    getRows: async (params: IServerSideRowGetParams, filters: FilterState) => {
      const { startRow, endRow, sortModel } = params.request;
      const sortTarget = sortModel.at(0);

      try {
        const response = await req(
          {
            body: JSON.stringify({
              startRow: startRow,
              endRow,
              filter: filters,
              orderBy: sortTarget?.colId,
              descending: sortTarget?.sort === 'desc',
            }),
            headers: {
              ['content-type']: 'application/json',
              ['x-fusion-context-id']: contextId,
            },

            method: 'POST',
          },
          params
        );

        if (colDefs === columnDefinitions && response.columnDefinitions) {
          const newColDefs = columnDefinitions.map((def) => {
            if (!response.columnDefinitions) return def;
            const apiDefintion = response.columnDefinitions.find(
              (s) => s.name.toLowerCase().trim() === def.colId?.toLowerCase().trim()
            );
            if (apiDefintion) {
              return {
                ...def,
                sortable: apiDefintion.sortOption,
                enableRowGroup: apiDefintion.groupOption,
              };
            }
            return def;
          });

          params.api.updateGridOptions({ columnDefs: newColDefs });
          setColDefs(newColDefs);
        }

        params.success({ rowData: response.items, rowCount: response.rowCount });
      } catch (e) {
        params.fail();
      }
    },
  };
}

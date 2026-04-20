import {
  ColDef,
  GridConfig,
  IServerSideGetRowsParams,
} from '@equinor/workspace-fusion/grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { useState } from 'react';
import { getPersistedColumnOrder } from '@equinor/workspace-ag-grid';
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
  columnDefinitions: ColDef<TData>[],
  storageKey?: string
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

          const persistedOrder = getPersistedColumnOrder(storageKey, columnDefinitions);
          const orderedColDefs = persistedOrder
            ? reorderColDefs(newColDefs, persistedOrder)
            : newColDefs;

          params.api.updateGridOptions({ columnDefs: orderedColDefs });
          setColDefs(orderedColDefs);
        }

        params.success({ rowData: response.items, rowCount: response.rowCount });
      } catch (e) {
        params.fail();
      }
    },
  };
}

function reorderColDefs<T>(colDefs: ColDef<T>[], persistedOrder: string[]): ColDef<T>[] {
  const colDefMap = new Map(colDefs.map((def) => [def.colId ?? def.field ?? '', def]));
  const ordered: ColDef<T>[] = [];

  for (const colId of persistedOrder) {
    const def = colDefMap.get(colId);
    if (def) {
      ordered.push(def);
      colDefMap.delete(colId);
    }
  }

  for (const def of colDefMap.values()) {
    ordered.push(def);
  }

  return ordered;
}

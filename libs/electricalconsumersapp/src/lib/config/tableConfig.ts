import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  MenuModule,
} from '@equinor/workspace-fusion/grid';

import { useHttpClient } from '@cc-components/shared';
import {
  GridColumnOption,
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import { ElectricalConsumer } from './workspaceConfig';

export const useTableConfig = (
  contextId: string
): GridConfig<ElectricalConsumer, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(
      `/api/contexts/${contextId}/electrical/consumers/grid`,
      req
    );
    const meta = (await res.json()) as {
      items: ElectricalConsumer[];
      rowCount: number;
      columnDefinitions: GridColumnOption[];
    };
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows: getRows,
    modules: [MenuModule, ColumnsToolPanelModule],
    columnDefinitions: colDefs as any,
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.columnApi.autoSizeColumns(
          e.columnApi
            .getAllDisplayedColumns()
            .filter((s) => s.getColId() !== 'description')
        );
      },
    },
  };
};

const columnDefinitions: ColDef<ElectricalConsumer>[] = [
  {
    colId: 'TagNo',
  },
  {
    colId: 'CommissioningPackageNo',
  },
  {
    colId: 'MechanicalCompletionPackageNo',
  },
  {
    colId: 'InstCode',
  },
  {
    colId: 'ConsumerType',
  },
  {
    colId: 'Description',
  },
  {
    colId: 'TagCategory',
  },
  {
    colId: 'TagCategoryDescription',
  },
  {
    colId: 'TagStatus',
  },
  {
    colId: 'ComponentType',
  },
  {
    colId: 'EleSymbolCode',
  },
  {
    colId: 'CubicleId',
  },
  {
    colId: 'DrawerId',
  },
  {
    colId: 'BranchId',
  },
];

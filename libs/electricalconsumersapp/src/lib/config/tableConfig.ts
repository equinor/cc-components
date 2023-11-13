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
    headerName: 'tagNo',
    colId: 'TagNo',
  },
  {
    headerName: 'commissioningPackageNo',
    colId: 'CommissioningPackageNo',
  },
  {
    headerName: 'mechanicalCompletionPackageNo',
    colId: 'MechanicalCompletionPackageNo',
  },
  {
    headerName: 'instCode',
    colId: 'InstCode',
  },
  {
    headerName: 'consumerType',
    colId: 'ConsumerType',
  },
  {
    headerName: 'description',
    colId: 'Description',
  },
  {
    headerName: 'tagCategory',
    colId: 'TagCategory',
  },
  {
    headerName: 'tagCategoryDescription',
    colId: 'TagCategoryDescription',
  },
  {
    headerName: 'tagStatus',
    colId: 'TagStatus',
  },
  {
    headerName: 'componentType',
    colId: 'ComponentType',
  },
  {
    headerName: 'eleSymbolCode',
    colId: 'EleSymbolCode',
  },
  {
    headerName: 'cubicleId',
    colId: 'CubicleId',
  },
  {
    headerName: 'drawerId',
    colId: 'DrawerId',
  },
  {
    headerName: 'branchId',
    colId: 'BranchId',
  },
];

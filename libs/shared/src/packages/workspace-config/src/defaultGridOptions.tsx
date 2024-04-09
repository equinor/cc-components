import { GridOptions } from '@equinor/workspace-ag-grid';
import { memo } from 'react';
import { defaultColDef } from './defaultColDef';
import { Skeleton } from '@cc-components/sharedcomponents';

const LoadingCellRenderer = memo(() => {
  return <Skeleton height={'20px'} width={'100px'} />;
});

const excludedColumns = ['title', 'description'];

export const defaultGridOptions: GridOptions = {
  loadingCellRenderer: LoadingCellRenderer,
  defaultColDef: defaultColDef,
  serverSideInitialRowCount: 100,
  enableBrowserTooltips: true,
  enableCellTextSelection: true,
  ensureDomOrder: true,
  onGridReady: (e) => {
    e.columnApi.autoSizeColumns(
      e.columnApi
        .getAllDisplayedColumns()
        .filter((s) => !excludedColumns.includes(s.getColId()))
    );
  },
  rowStyle: { fontSize: '14px' },
  suppressColumnVirtualisation: true,
};

import { Skeleton } from '@cc-components/sharedcomponents';
import { GridOptions } from '@equinor/workspace-ag-grid';
import { memo } from 'react';
import { defaultColDef } from './defaultColDef';

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
  onFirstDataRendered: (e) => {
    e.api.autoSizeColumns(
      e.api
        .getAllDisplayedColumns()
        .filter((s) => !excludedColumns.includes(s.getColId().toLocaleLowerCase()))
    );
  },
  rowStyle: { fontSize: '14px' },
  suppressColumnVirtualisation: true,
  autoSizePadding: 10,
};

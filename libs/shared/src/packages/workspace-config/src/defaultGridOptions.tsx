import { GridOptions } from '@equinor/workspace-ag-grid';
import { memo } from 'react';
import { defaultColDef } from './defaultColDef';
import { Skeleton } from '@cc-components/sharedcomponents';

const LoadingCellRenderer = memo(() => {
  return <Skeleton height={'20px'} width={'100px'} />;
});

export const defaultGridOptions = <T,>(): GridOptions<T> => ({
  loadingCellRenderer: LoadingCellRenderer,
  defaultColDef: defaultColDef,
  serverSideInitialRowCount: 100,
  enableBrowserTooltips: true,
  onFirstDataRendered: (e) => {
    e.columnApi.autoSizeColumns(
      e.columnApi.getAllDisplayedColumns().filter((s) => s.getColId() !== 'description')
    );
  },
  rowStyle: { fontSize: '14px' },
});

import { ColDef, GridOptions, Module } from '@equinor/fusion-framework-react-ag-grid/community';
import { AgGridReactProps } from '@equinor/fusion-framework-react-ag-grid';
import { Grid } from './Grid';

export type ClientGridProps<TData> = {
  height?: number;
  gridOptions?: GridOptions<TData>;
  rowData: TData[];
  colDefs: ColDef[];
  modules?: Module[] | undefined;
} & AgGridReactProps<TData>;

export function ClientGrid<TData>({ gridOptions, height, colDefs, rowData, modules, ...rest }: ClientGridProps<TData>) {
  /**
   *  Immutability does not work here
   *  User depends on gridOptions object reference
   */
  gridOptions ??= {};
  Object.assign(gridOptions, getClientSettings(colDefs));

  return (
    <Grid
      gridOptions={gridOptions}
      modules={modules}
      rowData={rowData}
      height={height}
      columnDefs={colDefs}
      {...rest}
    />
  );
}

const getClientSettings = <TData,>(colDef: ColDef[]): GridOptions<TData> => ({
  columnDefs: colDef,
});

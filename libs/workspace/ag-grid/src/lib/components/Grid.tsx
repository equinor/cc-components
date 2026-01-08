import { ClientSideRowModelModule, ModuleRegistry } from '@equinor/fusion-framework-react-ag-grid/community';
import { StyledGridWrapper } from './grid.styles';
import { AgGridReact, AgGridReactProps } from '@equinor/fusion-framework-react-ag-grid';
import { ServerSideRowModelModule } from '@equinor/fusion-framework-react-ag-grid/enterprise';

type GridProps<TData> = {
  height?: number; // height is now optional
} & AgGridReactProps<TData>;

ModuleRegistry.registerModules([ClientSideRowModelModule, ServerSideRowModelModule]);

export function Grid<TData>({ columnDefs, gridOptions, height, rowData, modules, ...rest }: GridProps<TData>) {
  const style = height ? { height } : {};

  return (
    <StyledGridWrapper style={style}>
      <AgGridReact
        rowHeight={32}
        groupDisplayType={'multipleColumns'}
        headerHeight={32}
        gridOptions={gridOptions}
        columnDefs={columnDefs}
        rowData={rowData}
        modules={modules}
        rowSelection="single"
        {...rest}
      />
    </StyledGridWrapper>
  );
}

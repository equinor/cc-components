import { jsx as _jsx } from "react/jsx-runtime";
import { ClientSideRowModelModule, ModuleRegistry } from '@equinor/fusion-framework-react-ag-grid/community';
import { StyledGridWrapper } from './grid.styles';
import { AgGridReact } from '@equinor/fusion-framework-react-ag-grid';
import { ServerSideRowModelModule } from '@equinor/fusion-framework-react-ag-grid/enterprise';
ModuleRegistry.registerModules([ClientSideRowModelModule, ServerSideRowModelModule]);
export function Grid({ columnDefs, gridOptions, height, rowData, modules, ...rest }) {
    const style = height ? { height } : {};
    return (_jsx(StyledGridWrapper, { style: style, children: _jsx(AgGridReact, { rowHeight: 32, groupDisplayType: 'multipleColumns', headerHeight: 32, gridOptions: gridOptions, columnDefs: columnDefs, rowData: rowData, modules: modules, rowSelection: "single", ...rest }) }));
}

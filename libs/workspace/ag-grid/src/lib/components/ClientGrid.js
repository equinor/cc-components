import { jsx as _jsx } from "react/jsx-runtime";
import { Grid } from './Grid';
export function ClientGrid({ gridOptions, height, colDefs, rowData, modules, ...rest }) {
    /**
     *  Immutability does not work here
     *  User depends on gridOptions object reference
     */
    gridOptions ??= {};
    Object.assign(gridOptions, getClientSettings(colDefs));
    return (_jsx(Grid, { gridOptions: gridOptions, modules: modules, rowData: rowData, height: height, columnDefs: colDefs, ...rest }));
}
const getClientSettings = (colDef) => ({
    columnDefs: colDef,
});

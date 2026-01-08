import { jsx as _jsx } from "react/jsx-runtime";
import { Grid } from './Grid';
export function ServerGrid({ getRows, height, gridOptions, colDefs, context, modules, ...rest }) {
    /**
     *  Immutability does not work here
     *  User depends on gridOptions object reference
     */
    gridOptions ??= {};
    Object.assign(gridOptions, getServerSettings({ getRows }, colDefs));
    return _jsx(Grid, { height: height, context: context, modules: modules, gridOptions: gridOptions, ...rest });
}
const getServerSettings = (dataSource, colDef) => ({
    serverSideDatasource: dataSource,
    rowModelType: 'serverSide',
    columnDefs: colDef,
});

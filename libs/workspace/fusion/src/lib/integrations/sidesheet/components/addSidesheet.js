import { jsx as _jsx } from "react/jsx-runtime";
import { SidesheetSimpleWrapper } from './wrapper/SidesheetSimpleWrapper';
export function addSidesheet(config) {
    if (!config || Object.keys(config).length === 0)
        return;
    if (config.type === 'default') {
        return () => (_jsx(SidesheetSimpleWrapper, { DetailsSidesheet: config.DetailsSidesheet, CreateSidesheet: config.CreateSidesheet }));
    }
    return;
}

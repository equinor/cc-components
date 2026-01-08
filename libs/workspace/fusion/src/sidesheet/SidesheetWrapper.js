import { jsx as _jsx } from "react/jsx-runtime";
import { ResizeProvider } from './ResizeProvider';
export function SidesheetWrapper({ children, minWidth = 20, defaultWidth = 700 }) {
    return (_jsx(ResizeProvider, { defaultWidth: defaultWidth, minWidth: minWidth, children: children }));
}

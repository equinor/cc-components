import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from 'react';
import { StatusBarWrapper } from '../components/StatusBarWrapper';
export function addStatusBar(config) {
    if (!config)
        return;
    const StatusBarProvider = ({ children }) => (_jsx(StatusBarContext.Provider, { value: () => _jsx(StatusBarWrapper, { config: config }), children: children }));
    return {
        Component: StatusBarProvider,
        name: 'Status bar',
    };
}
export const StatusBarContext = createContext(undefined);

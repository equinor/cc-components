import { jsx as _jsx } from "react/jsx-runtime";
import { useTabs } from '@equinor/workspace-react';
import { createContext, useContext, useState } from 'react';
const defaultState = {
    analyticsTabs: [],
    icons: [],
    viewTabs: [],
    setIcons: () => void 0,
};
export const WorkspaceHeaderComponents = createContext(defaultState);
export const useWorkspaceHeaderComponents = () => useContext(WorkspaceHeaderComponents);
export const RootHeaderContext = ({ children }) => {
    const [icons, setIcons] = useState([]);
    const tabs = useTabs();
    const analyticsTabs = tabs.filter((s) => s.name === 'powerbi');
    const viewTabs = tabs.filter((s) => s.name !== 'powerbi');
    return (_jsx(WorkspaceHeaderComponents.Provider, { value: {
            ...defaultState,
            analyticsTabs: analyticsTabs,
            viewTabs: viewTabs,
            setIcons,
            icons,
        }, children: children }));
};

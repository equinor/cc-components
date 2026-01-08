import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContextProviders } from './contextProviders/ContextProviders';
import { WorkspaceWrapper } from './workspace.styles';
import { WorkspaceBody } from './workspaceBody';
import { WorkspaceHeader } from './WorkspaceHeader';
import { createContext, useContext, useEffect, useRef, } from 'react';
import { createTabController } from '../utils/tabController';
import { useTabContext } from '../hooks/useTab';
import styled from 'styled-components';
export const TabProvider = createContext(null);
export const TabsProvider = createContext(null);
export function Workspace({ tabs, defaultTab, Sidesheet = () => _jsx(_Fragment, {}), providers, events }) {
    const tabController = useRef(createTabController({ defaultTab, tabs }));
    return (_jsx(WorkspaceWrapper, { id: "workspace_root", children: _jsx(TabProvider.Provider, { value: tabController.current, children: _jsx(TabsProvider.Provider, { value: tabs, children: _jsx(EventHandler, { ...events, children: _jsx(ContextProviders, { providers: providers, children: _jsxs(StyledLayoutWrapper, { children: [_jsx(WorkspaceHeader, {}), _jsx(WorkspaceBody, {}), _jsx(StyledSidesheetWrapper, { id: "sidesheet-workspace-wrapper", children: _jsx(Sidesheet, {}) })] }) }) }) }) }, 'tab_controller') }));
}
const StyledSidesheetWrapper = styled.div `
  grid-area: 1 / 2 / span 2;
  background: white;
  z-index: 2;
`;
const StyledLayoutWrapper = styled.div `
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr auto;
  height: 100%;
  width: 100%;
`;
const EventHandler = (props) => {
    const { activeTab, setActiveTab } = useTabContext((s) => s);
    const tabs = useContext(TabsProvider);
    useEffect(() => {
        if (!props.onTabChange)
            return;
        props.onTabChange(activeTab, tabs ?? []);
    }, [activeTab]);
    return _jsx(_Fragment, { children: props.children });
};

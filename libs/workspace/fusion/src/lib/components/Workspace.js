import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Workspace as WorkspaceView } from '@equinor/workspace-react';
import { createConfigurationObject } from '../utils/createWorkspaceConfig';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { WorkspaceBoundary } from './error';
import { FilterContextProvider } from '@equinor/workspace-filter';
import { updateQueryParams } from '../classes/fusionUrlHandler';
import { WorkspaceContextProvider } from '../context/WorkspaceControllerContext';
import { useWorkspace } from '../hooks';
import { useMemo, useRef } from 'react';
import { SettingsProvider } from '@equinor/workspace-core';
const client = new QueryClient();
export function Workspace(props) {
    return (_jsx(WorkspaceBoundary, { children: _jsx(WorkspaceContextProvider, { getIdentifier: props.workspaceOptions.getIdentifier, onBookmarkChange: props.onBookmarkChange, children: _jsx(WorkspaceComponent, { ...props }) }) }));
}
/** Tries to use the surrounding queryClient if there is one, otherwise it creates a new one */
function useCheckParentClient() {
    try {
        return useQueryClient();
    }
    catch {
        return client;
    }
}
function WorkspaceComponent(props) {
    const client = useCheckParentClient();
    const bookmarkRef = useRef(props.currentBookmark);
    const { handleTabChange, updatePayload } = useWorkspace();
    const configuration = useMemo(() => createConfigurationObject(bookmarkRef.current ? props : { ...props, currentBookmark: null }), []);
    //TODO: Refactor this!
    const currentView = useMemo(() => {
        return (_jsx(_Fragment, { children: _jsx(WorkspaceView, { Sidesheet: configuration.Sidesheet, providers: configuration.providers, defaultTab: configuration.defaultTab, tabs: configuration.tabs, events: {
                    onTabChange: (newTab) => {
                        bookmarkRef.current = null;
                        updateQueryParams([['tab', newTab]]);
                        handleTabChange(newTab);
                    },
                } }) }));
    }, [configuration]);
    const filterDataSource = props.filterOptions?.dataSource;
    if (bookmarkRef.current) {
        window.ai?.trackEvent({
            name: 'BookmarkUsed',
            properties: {
                bookmark: bookmarkRef.current,
            },
        });
    }
    return (_jsx(QueryClientProvider, { client: client, children: _jsx(SettingsProvider, { children: _jsx(FilterContextProvider, { dataSource: filterDataSource, initialState: props.currentBookmark?.payload.filter, onChange: (val) => {
                    updatePayload((p) => ({ ...p, filter: val }));
                }, appName: props.appName, children: currentView }) }) }));
}

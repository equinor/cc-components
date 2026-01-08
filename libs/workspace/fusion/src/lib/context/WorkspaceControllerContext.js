import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useCallback, useRef } from 'react';
export const WorkspaceContext = createContext(null);
export function WorkspaceContextProvider(props) {
    const { clearSelection, selectById, selectItem, selection } = useSelection(props.getIdentifier);
    const { bookmarkRef, handleTabChange, updatePayload } = useBookmarkRef(props.onBookmarkChange);
    const [isCreateSidesheetOpen, setCreateSidesheetOpen] = useState(false);
    return (_jsx(WorkspaceContext.Provider, { value: {
            bookmarkRef,
            handleTabChange,
            updatePayload,
            isCreateSidesheetOpen,
            openCreateSidesheet: () => {
                clearSelection();
                setCreateSidesheetOpen(true);
            },
            closeCreateSidesheet: () => setCreateSidesheetOpen(false),
            clearSelection,
            selectById,
            selectItem: selectItem,
            selection,
        }, children: props.children }));
}
function useBookmarkRef(notifier) {
    const bookmarkRef = useRef({ payload: {}, tab: undefined });
    const updateBookmarkRefTab = (tab) => {
        bookmarkRef.current = { tab: tab, payload: {} };
        notifier && notifier(bookmarkRef.current);
    };
    const updatePayload = (updater) => {
        const newPayload = updater(bookmarkRef.current.payload ?? {});
        if (!newPayload) {
            return;
        }
        bookmarkRef.current.payload = newPayload;
        notifier && notifier(bookmarkRef.current);
    };
    return {
        bookmarkRef,
        updatePayload,
        handleTabChange: updateBookmarkRefTab,
    };
}
function useSelection(getIdentifier) {
    const [selection, set] = useState(getItemIdFromUrl());
    /** curry setter to avoid useEffect */
    const setSelection = useCallback((ev) => {
        set(ev);
        onSelectedChange(ev);
    }, [set]);
    const clearSelection = useCallback(() => setSelection(null), [setSelection]);
    const selectById = useCallback((id) => setSelection({ id: id, item: null }), [setSelection]);
    const selectItem = useCallback((item) => setSelection({ id: getIdentifier(item), item: item }), [setSelection]);
    return {
        selection,
        clearSelection,
        selectById,
        selectItem,
    };
}
function getItemIdFromUrl() {
    const url = new URL(window.location.toString());
    const itemId = url.searchParams.get('item');
    if (!itemId)
        return null;
    return { id: itemId, item: null };
}
/**
 * Update url when a selection event occurs
 */
const onSelectedChange = (selectionEvent) => {
    const url = new URL(window.location.toString());
    if (selectionEvent) {
        url.searchParams.set('item', selectionEvent?.id);
    }
    else {
        url.searchParams.delete('item');
    }
    window.history.replaceState(undefined, '', url);
};

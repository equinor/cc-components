import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { QuickFilter } from '../quickFilter/QuickFilter';
import { playlist_add, search, drag_handle, chevron_down, chevron_up } from '@equinor/eds-icons';
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from '../skeleton/Skeleton';
import { ExpandedFilter } from '../expandedFilter/ExpandedFilter';
import { FilterQuickSearch } from '../filterQuickSearch/FilterQuickSearch';
import { FilterClearIcon, FilterCollapseIcon, FilterExpandIcon } from '@equinor/workspace-core';
import { StyledButton, StyledButtonContent, StyledFilterBar, StyledFilterLoadingFallback } from './Filter.styles';
import FilterSettingsMenu from '../filterSettingsMenu/filterSettingsMenu';
Icon.add({ playlist_add, search, drag_handle, chevron_down, chevron_up });
export function Filter({ filterValues, handleFilterItemClick, handleBulkFilterUpdate, clearFilters, hideSearch, searchText, searchTextChange, includeItemCount, disableSettings, }) {
    const [expanded, setExpanded] = useState(false);
    const filtersActive = filterValues.some((f) => f.filterItems.some((fI) => fI.selected)) ||
        (searchText !== undefined && searchText !== '');
    const clearFilterGroup = (group) => {
        handleBulkFilterUpdate(group, []);
    };
    return (_jsxs(ErrorBoundary, { FallbackComponent: () => _jsx("div", { children: "Filter failed to load" }), children: [_jsxs(StyledFilterBar, { children: [!hideSearch && searchText !== undefined && searchTextChange && (_jsx(FilterQuickSearch, { searchText: searchText, searchTextChange: searchTextChange })), !expanded && (_jsx(Suspense, { fallback: _jsx(FilterLoadingFallback, {}), children: _jsx(QuickFilter, { filterValues: filterValues, filterChanged: handleFilterItemClick, clearFilterGroup: clearFilterGroup, includeItemCount: includeItemCount }) })), _jsx(Tooltip, { title: "Clear all active filters", children: _jsx(StyledButton, { variant: "ghost_icon", onClick: clearFilters, disabled: !filtersActive, children: _jsx(FilterClearIcon, { isDisabled: !filtersActive }) }) }), _jsx(Tooltip, { title: expanded ? 'Hide all filter options' : 'Show all filter options', children: _jsx(Button, { variant: "ghost", onClick: () => setExpanded(!expanded), children: _jsx(StyledButtonContent, { children: expanded ? (_jsxs(_Fragment, { children: [_jsx(FilterCollapseIcon, {}), " ", _jsx("div", { children: "Hide all" })] })) : (_jsxs(_Fragment, { children: [_jsx(FilterExpandIcon, {}), " ", _jsx("div", { children: "Show all" })] })) }) }) }), _jsx(Tooltip, { title: "Open filter settings", children: _jsx(FilterSettingsMenu, { disabled: disableSettings }) })] }), expanded && (_jsx(ExpandedFilter, { filterValues: filterValues, handleFilterItemClick: handleFilterItemClick, bulkUpdateFilters: handleBulkFilterUpdate, includeItemCount: includeItemCount }))] }));
}
export function FilterLoadingFallback() {
    return (_jsxs(StyledFilterLoadingFallback, { children: [_jsx(Skeleton, { height: 25, width: 100 }), _jsx(Skeleton, { height: 25, width: 100 }), _jsx(Skeleton, { height: 25, width: 100 }), _jsx(Skeleton, { height: 25, width: 100 })] }));
}

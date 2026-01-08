import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { EdsProvider, Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import { FilterClearIcon, ResizableContainer, SearchIcon, useClickOutside, SmallCloseIcon, } from '@equinor/workspace-core';
import { FilterListContainer, FilterContainer, FilterContainerHeader, ListItemContainer, SmallCheckbox, ListItem, ListItemText, ItemCount, SearchbarContainer, HeaderIconButton, } from './ExpandedFilter.styles';
const MIN_ITEMS_FOR_SEARCH = 5;
export const ExpandedFilter = ({ filterValues, handleFilterItemClick, bulkUpdateFilters, includeItemCount, }) => {
    return (_jsx(EdsProvider, { density: "compact", children: _jsx(ResizableContainer, { style: {
                backgroundColor: tokens.colors.ui.background__light.hex,
                overflowX: 'scroll',
            }, handleSize: "small", children: _jsx(FilterListContainer, { children: filterValues.map((group) => {
                    const parentRef = useRef(null);
                    const searchbarRef = useRef(null);
                    const containerRef = useRef(null);
                    const [searchTerm, setSearchTerm] = useState('');
                    const [isSearchActive, setIsSearchActive] = useState(false);
                    const filteredItems = group.filterItems.filter((item) => item.value.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        (!includeItemCount || item.count === undefined || item.count > 0 || item.selected));
                    const filterItemsWithSelectAll = [
                        ...(group.filterItems.length >= MIN_ITEMS_FOR_SEARCH
                            ? [
                                {
                                    value: 'Select all',
                                    selected: filteredItems.every((item) => item.selected),
                                    count: filteredItems.reduce((acc, item) => acc + (item.count ?? 0), 0),
                                    indeterminate: filteredItems.some((item) => item.selected) && !filteredItems.every((item) => item.selected),
                                    onClick: () => {
                                        handleSelectAll(group.name);
                                    },
                                },
                            ]
                            : []),
                        ...filteredItems,
                    ];
                    const rowVirtualizer = useVirtualizer({
                        count: filterItemsWithSelectAll.length,
                        getScrollElement: () => parentRef.current,
                        estimateSize: () => 24,
                    });
                    const handleSelectAll = (name) => {
                        const selectedItems = filteredItems.filter((item) => item.selected).map((item) => item.value);
                        const allVisibleFilterValues = filteredItems.map((item) => item.value);
                        if (selectedItems.length === allVisibleFilterValues.length) {
                            bulkUpdateFilters(name, []);
                        }
                        else {
                            bulkUpdateFilters(name, allVisibleFilterValues);
                        }
                    };
                    useClickOutside(containerRef, () => {
                        setIsSearchActive(false);
                        setSearchTerm('');
                    });
                    useClickOutside(searchbarRef, (e) => {
                        searchbarRef.current?.focus();
                    });
                    const handleToggleSearch = () => {
                        setIsSearchActive((prev) => !prev);
                        setSearchTerm('');
                    };
                    const isFilterActive = group.filterItems.some((item) => item.selected);
                    return (_jsxs(FilterContainer, { ref: containerRef, children: [_jsx(FilterContainerHeader, { isfilteractive: isFilterActive, children: isSearchActive ? (_jsxs(SearchbarContainer, { children: [_jsx("input", { type: "text", placeholder: "Search", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), ref: searchbarRef, autoFocus: true }), _jsx(Tooltip, { title: `Stop searching`, children: _jsx(HeaderIconButton, { variant: "ghost_icon", onClick: handleToggleSearch, "aria-label": "Toggle search", children: _jsx(SmallCloseIcon, { color: tokens.colors.interactive.primary__resting.hex }) }) })] })) : (_jsxs(_Fragment, { children: [_jsx(Typography, { group: "table", variant: "cell_header", color: isFilterActive ? 'primary' : undefined, children: group.name +
                                                (group.filterItems.filter((item) => item.selected).length > 0
                                                    ? ` (+${group.filterItems.filter((item) => item.selected).length})`
                                                    : '') }), _jsxs("div", { children: [isFilterActive && (_jsx(Tooltip, { title: `Clear ${group.name} filters`, children: _jsx(HeaderIconButton, { variant: "ghost_icon", onClick: () => bulkUpdateFilters(group.name, []), "aria-label": "Clear filters", children: _jsx(FilterClearIcon, {}) }) })), group.filterItems.length >= MIN_ITEMS_FOR_SEARCH && (_jsx(Tooltip, { title: `Search for ${group.name}`, children: _jsx(HeaderIconButton, { variant: "ghost_icon", onClick: handleToggleSearch, "aria-label": "Toggle search", children: _jsx(SearchIcon, { color: tokens.colors.interactive.primary__resting.hex }) }) }))] })] })) }), _jsx(ListItemContainer, { ref: parentRef, children: _jsx("div", { style: { height: rowVirtualizer.getTotalSize(), position: 'relative' }, children: rowVirtualizer.getVirtualItems().map(({ index, size, start }) => {
                                        const item = filterItemsWithSelectAll[index];
                                        return (_jsx(Tooltip, { title: item.descriptions && item.descriptions.length > 0
                                                ? item.descriptions?.join(' // ')
                                                : item.value, enterDelay: 500, children: _jsxs(ListItem, { id: "filter-item", start: start, height: size, onClick: () => (item.onClick ? item.onClick() : handleFilterItemClick(group, item)), children: [_jsx(SmallCheckbox, { checked: item.selected, indeterminate: item.indeterminate, readOnly: true }), _jsx(ListItemText, { group: "table", variant: "cell_numeric_monospaced", children: item.value }), includeItemCount && _jsx(ItemCount, { children: `(${item.count})` })] }, item.value) }, item.value));
                                    }) }) })] }, group.name));
                }) }) }) }));
};

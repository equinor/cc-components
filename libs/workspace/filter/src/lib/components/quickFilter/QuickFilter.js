import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QuickFilterChip, QuickFilterContainer } from './quickFilter.styles';
import { Dropdown } from '@equinor/workspace-core';
import { Typography } from '@equinor/eds-core-react';
export function QuickFilter({ filterChanged, filterValues, clearFilterGroup, includeItemCount, }) {
    const selectedHiddenFilters = filterValues.filter((g) => !g.isQuickFilter && g.filterItems.some((fi) => fi.selected)).length;
    if (!filterValues || filterValues.length === 0) {
        return null;
    }
    return (_jsxs(QuickFilterContainer, { children: [filterValues
                .filter((g) => g.isQuickFilter)
                .map((group) => (_jsx(Dropdown, { listItems: group.filterItems.filter((item) => !includeItemCount || item.count === undefined || item.count > 0), valueSelected: (value) => {
                    filterChanged(group, value);
                }, clearAll: () => clearFilterGroup(group.name), valueGetter: (value) => value.value, tooltipGetter: (item) => item.descriptions && item.descriptions.length > 0 ? item.descriptions?.join(' // ') : item.value, customRenderer: (v) => (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', width: '100%', overflow: 'hidden' }, children: [_jsx(Typography, { variant: "caption", style: { overflow: 'hidden', textOverflow: 'ellipsis' }, children: v.value }), v.count && _jsx(Typography, { variant: "caption", children: `(${v.count})` })] })), children: _jsx(Typography, { variant: "caption", children: group.name }) }, group.name))), selectedHiddenFilters > 0 && (_jsxs(QuickFilterChip, { children: [_jsx(Typography, { variant: "caption", children: `+${selectedHiddenFilters} filter` }), ' '] }))] }));
}

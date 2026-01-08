import { jsx as _jsx } from "react/jsx-runtime";
import { useFilterContext } from 'lib/context/filterContext';
import { useState } from 'react';
import { Filter } from '../filter/Filter';
import { Skeleton } from '../skeleton/Skeleton';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const StyledFilterBar = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100vw;
  height: 48px;
  background: ${tokens.colors.ui.background__light.hex};
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  gap: 16px;
  border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
export function WorkspaceFilter() {
    const { filterValues, setFilter, clearFilters, setSearchText: triggerSearch, filterState, includeCount, } = useFilterContext();
    const [searchText, setSearchText] = useState(filterState.search);
    const handleFilterItemClick = (group, item) => {
        if (!item.selected &&
            filterValues.find((g) => g.name === group.name)?.filterItems?.find((i) => i.value === item.value)) {
            setFilter(group.name, [...group.filterItems?.filter((i) => i.selected).map((i) => i.value), item.value]);
        }
        else {
            setFilter(group.name, group.filterItems?.filter((i) => i.selected && i.value !== item.value).map((i) => i.value));
        }
    };
    const handleUpdateAllFilters = (group, selected) => {
        setFilter(group, selected);
    };
    const handleSearchTextChange = (text) => {
        setSearchText(text);
        triggerSearch(text);
    };
    const handleClearFilters = () => {
        setSearchText('');
        triggerSearch('');
        clearFilters();
    };
    if (!filterValues || filterValues.length === 0) {
        return (_jsx(StyledFilterBar, { children: Array.from({ length: 5 }).map((_, i) => (_jsx(Skeleton, { width: 100, height: 25 }, i))) }));
    }
    return (_jsx(Filter, { filterValues: filterValues, handleFilterItemClick: handleFilterItemClick, handleBulkFilterUpdate: handleUpdateAllFilters, clearFilters: handleClearFilters, searchText: searchText, searchTextChange: handleSearchTextChange, includeItemCount: includeCount }));
}

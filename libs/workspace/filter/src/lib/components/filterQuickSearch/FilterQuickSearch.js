import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import { EdsSearch } from './filterQuickSearch.styles';
const FullWidthEdsSearch = styled(EdsSearch) `
  width: 100%;
`;
export const FilterQuickSearch = ({ searchText, searchTextChange }) => {
    function handleClear(e) {
        if (e.target.value.length === 0) {
            searchTextChange('');
        }
    }
    function handleInput(e) {
        const { value } = e.target;
        searchTextChange(value || '');
    }
    return (_jsx(FullWidthEdsSearch, { hasValue: Boolean(searchText), onChange: handleClear, placeholder: "Search for id or description", onInput: handleInput, value: searchText, id: "quick-filter-search", onKeyDown: (e) => {
            if (e.key === 'Enter') {
                searchTextChange(searchText ?? '');
            }
        } }));
};

import styled from 'styled-components';
import { EdsSearch } from './filterQuickSearch.styles';
import { ReactElement } from 'react';

const FullWidthEdsSearch = styled(EdsSearch)`
  width: 100%;
`;

interface FilterQuickSearchProps {
  searchText: string | undefined;
  searchTextChange: (text: string) => void;
}

export const FilterQuickSearch = ({ searchText, searchTextChange }: FilterQuickSearchProps): ReactElement => {
  function handleClear(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      searchTextChange('');
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    searchTextChange(value || '');
  }

  return (
    <FullWidthEdsSearch
      hasValue={Boolean(searchText)}
      onChange={handleClear}
      placeholder="Search for id or description"
      onInput={handleInput}
      value={searchText}
      id="quick-filter-search"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          searchTextChange(searchText ?? '');
        }
      }}
    />
  );
};

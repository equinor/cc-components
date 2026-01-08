import { QuickFilter } from '../quickFilter/QuickFilter';
import { playlist_add, search, drag_handle, chevron_down, chevron_up } from '@equinor/eds-icons';
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from '../skeleton/Skeleton';
import { ExpandedFilter } from '../expandedFilter/ExpandedFilter';
import { FilterQuickSearch } from '../filterQuickSearch/FilterQuickSearch';
import { FilterGroup, FilterValueType } from 'lib/types';
import { FilterClearIcon, FilterCollapseIcon, FilterExpandIcon } from '@equinor/workspace-core';
import { StyledButton, StyledButtonContent, StyledFilterBar, StyledFilterLoadingFallback } from './Filter.styles';
import FilterSettingsMenu from '../filterSettingsMenu/filterSettingsMenu';

Icon.add({ playlist_add, search, drag_handle, chevron_down, chevron_up });

interface FilterProps {
  filterValues: FilterGroup[];
  handleFilterItemClick: (group: FilterGroup, item: FilterValueType) => void;
  handleBulkFilterUpdate: (groupName: string, selected: string[]) => void;
  clearFilters: () => void;
  hideSearch?: boolean;
  searchText?: string;
  searchTextChange?: (text: string) => void;
  includeItemCount?: boolean;
  disableSettings?: boolean;
}

export function Filter({
  filterValues,
  handleFilterItemClick,
  handleBulkFilterUpdate,
  clearFilters,
  hideSearch,
  searchText,
  searchTextChange,
  includeItemCount,
  disableSettings,
}: FilterProps) {
  const [expanded, setExpanded] = useState(false);

  const filtersActive =
    filterValues.some((f) => f.filterItems.some((fI) => fI.selected)) ||
    (searchText !== undefined && searchText !== '');

  const clearFilterGroup = (group: string) => {
    handleBulkFilterUpdate(group, []);
  };

  return (
    <ErrorBoundary FallbackComponent={() => <div>Filter failed to load</div>}>
      <StyledFilterBar>
        {!hideSearch && searchText !== undefined && searchTextChange && (
          <FilterQuickSearch searchText={searchText} searchTextChange={searchTextChange} />
        )}
        {!expanded && (
          <Suspense fallback={<FilterLoadingFallback />}>
            <QuickFilter
              filterValues={filterValues}
              filterChanged={handleFilterItemClick}
              clearFilterGroup={clearFilterGroup}
              includeItemCount={includeItemCount}
            />
          </Suspense>
        )}
        <Tooltip title="Clear all active filters">
          <StyledButton variant="ghost_icon" onClick={clearFilters} disabled={!filtersActive}>
            <FilterClearIcon isDisabled={!filtersActive} />
          </StyledButton>
        </Tooltip>
        <Tooltip title={expanded ? 'Hide all filter options' : 'Show all filter options'}>
          <Button variant="ghost" onClick={() => setExpanded(!expanded)}>
            <StyledButtonContent>
              {expanded ? (
                <>
                  <FilterCollapseIcon /> <div>Hide all</div>
                </>
              ) : (
                <>
                  <FilterExpandIcon /> <div>Show all</div>
                </>
              )}
            </StyledButtonContent>
          </Button>
        </Tooltip>
        <Tooltip title="Open filter settings">
          <FilterSettingsMenu disabled={disableSettings} />
        </Tooltip>
      </StyledFilterBar>
      {expanded && (
        <ExpandedFilter
          filterValues={filterValues}
          handleFilterItemClick={handleFilterItemClick}
          bulkUpdateFilters={handleBulkFilterUpdate}
          includeItemCount={includeItemCount}
        />
      )}
    </ErrorBoundary>
  );
}

export function FilterLoadingFallback() {
  return (
    <StyledFilterLoadingFallback>
      <Skeleton height={25} width={100} />
      <Skeleton height={25} width={100} />
      <Skeleton height={25} width={100} />
      <Skeleton height={25} width={100} />
    </StyledFilterLoadingFallback>
  );
}

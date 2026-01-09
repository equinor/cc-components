import { EdsProvider, Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  FilterClearIcon,
  ResizableContainer,
  SearchIcon,
  useClickOutside,
  SmallCloseIcon,
} from '@equinor/workspace-core';
import { FilterGroup, FilterValueType } from '../../types';
import {
  FilterListContainer,
  FilterContainer,
  FilterContainerHeader,
  ListItemContainer,
  SmallCheckbox,
  ListItem,
  ListItemText,
  ItemCount,
  SearchbarContainer,
  HeaderIconButton,
  ResizeHandle,
} from './ExpandedFilter.styles';

interface ExpandedFilterProps {
  filterValues: FilterGroup[];
  handleFilterItemClick: (group: FilterGroup, item: FilterValueType) => void;
  bulkUpdateFilters: (groupName: string, selected: string[]) => void;
  includeItemCount?: boolean;
}

interface FilterColumnProps {
  group: FilterGroup;
  handleFilterItemClick: (group: FilterGroup, item: FilterValueType) => void;
  bulkUpdateFilters: (groupName: string, selected: string[]) => void;
  includeItemCount?: boolean;
}

const MIN_ITEMS_FOR_SEARCH = 5;
const DEFAULT_COLUMN_WIDTH = 250;
const MIN_COLUMN_WIDTH = 150;
const MAX_COLUMN_WIDTH = 1000;

const FilterColumn: React.FC<FilterColumnProps> = ({
  group,
  handleFilterItemClick,
  bulkUpdateFilters,
  includeItemCount,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const searchbarRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [columnWidth, setColumnWidth] = useState(DEFAULT_COLUMN_WIDTH);
  const resizeHandlersRef = useRef<{
    move: (e: MouseEvent) => void;
    up: () => void;
  } | null>(null);

  const cleanupResizeHandlers = useCallback(() => {
    if (resizeHandlersRef.current) {
      window.removeEventListener('mousemove', resizeHandlersRef.current.move);
      window.removeEventListener('mouseup', resizeHandlersRef.current.up);
      resizeHandlersRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanupResizeHandlers;
  }, [cleanupResizeHandlers]);

  const filteredItems = group.filterItems.filter(
    (item) =>
      item.value.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!includeItemCount || item.count === undefined || item.count > 0 || item.selected)
  );

  const handleSelectAll = (name: string) => {
    const selectedItems = filteredItems
      .filter((item) => item.selected)
      .map((item) => item.value);
    const allVisibleFilterValues = filteredItems.map((item) => item.value);
    if (selectedItems.length === allVisibleFilterValues.length) {
      bulkUpdateFilters(name, []);
    } else {
      bulkUpdateFilters(name, allVisibleFilterValues);
    }
  };

  const filterItemsWithSelectAll = [
    ...(group.filterItems.length >= MIN_ITEMS_FOR_SEARCH
      ? [
          {
            value: 'Select all',
            selected: filteredItems.every((item) => item.selected),
            count: filteredItems.reduce((acc, item) => acc + (item.count ?? 0), 0),
            indeterminate:
              filteredItems.some((item) => item.selected) &&
              !filteredItems.every((item) => item.selected),
            onClick: () => {
              handleSelectAll(group.name);
            },
          } as FilterValueType,
        ]
      : []),
    ...filteredItems,
  ];

  const rowVirtualizer = useVirtualizer({
    count: filterItemsWithSelectAll.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24,
  });

  useClickOutside(containerRef, () => {
    setIsSearchActive(false);
    setSearchTerm('');
  });

  useClickOutside(searchbarRef, () => {
    searchbarRef.current?.focus();
  });

  const handleToggleSearch = () => {
    setIsSearchActive((prev) => !prev);
    setSearchTerm('');
  };

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    cleanupResizeHandlers();

    const startX = e.clientX;
    const startWidth = columnWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const clampedWidth = Math.min(
        Math.max(newWidth, MIN_COLUMN_WIDTH),
        MAX_COLUMN_WIDTH
      );
      setColumnWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      cleanupResizeHandlers();
    };

    resizeHandlersRef.current = { move: handleMouseMove, up: handleMouseUp };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const isFilterActive = group.filterItems.some((item) => item.selected);

  return (
    <FilterContainer
      ref={containerRef}
      width={columnWidth}
      minWidth={MIN_COLUMN_WIDTH}
      maxWidth={MAX_COLUMN_WIDTH}
    >
      <FilterContainerHeader isfilteractive={isFilterActive}>
        {isSearchActive ? (
          <SearchbarContainer>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={searchbarRef}
              autoFocus
            />
            <Tooltip title={`Stop searching`}>
              <HeaderIconButton
                variant="ghost_icon"
                onClick={handleToggleSearch}
                aria-label="Toggle search"
              >
                <SmallCloseIcon
                  color={tokens.colors.interactive.primary__resting.hex}
                ></SmallCloseIcon>
              </HeaderIconButton>
            </Tooltip>
          </SearchbarContainer>
        ) : (
          <>
            <Typography
              group="table"
              variant="cell_header"
              color={isFilterActive ? 'primary' : undefined}
            >
              {group.name +
                (group.filterItems.filter((item) => item.selected).length > 0
                  ? ` (+${group.filterItems.filter((item) => item.selected).length})`
                  : '')}
            </Typography>
            <div>
              {isFilterActive && (
                <Tooltip title={`Clear ${group.name} filters`}>
                  <HeaderIconButton
                    variant="ghost_icon"
                    onClick={() => bulkUpdateFilters(group.name, [])}
                    aria-label="Clear filters"
                  >
                    <FilterClearIcon></FilterClearIcon>
                  </HeaderIconButton>
                </Tooltip>
              )}
              {group.filterItems.length >= MIN_ITEMS_FOR_SEARCH && (
                <Tooltip title={`Search for ${group.name}`}>
                  <HeaderIconButton
                    variant="ghost_icon"
                    onClick={handleToggleSearch}
                    aria-label="Toggle search"
                  >
                    <SearchIcon
                      color={tokens.colors.interactive.primary__resting.hex}
                    ></SearchIcon>
                  </HeaderIconButton>
                </Tooltip>
              )}
            </div>
          </>
        )}
      </FilterContainerHeader>
      <ListItemContainer ref={parentRef}>
        <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map(({ index, size, start }) => {
            const item = filterItemsWithSelectAll[index];
            return (
              <Tooltip
                title={
                  item.descriptions && item.descriptions.length > 0
                    ? item.descriptions?.join(' // ')
                    : item.value
                }
                key={item.value}
                enterDelay={500}
              >
                <ListItem
                  id="filter-item"
                  key={item.value}
                  start={start}
                  height={size}
                  onClick={() =>
                    item.onClick ? item.onClick() : handleFilterItemClick(group, item)
                  }
                >
                  <SmallCheckbox
                    checked={item.selected}
                    indeterminate={item.indeterminate}
                    readOnly
                  />
                  <ListItemText group="table" variant="cell_numeric_monospaced">
                    {item.value}
                  </ListItemText>
                  {includeItemCount && <ItemCount>{`(${item.count})`}</ItemCount>}
                </ListItem>
              </Tooltip>
            );
          })}
        </div>
      </ListItemContainer>
      <ResizeHandle onMouseDown={handleResizeStart} />
    </FilterContainer>
  );
};

export const ExpandedFilter: React.FC<ExpandedFilterProps> = ({
  filterValues,
  handleFilterItemClick,
  bulkUpdateFilters,
  includeItemCount,
}) => {
  return (
    <EdsProvider density="compact">
      <ResizableContainer
        style={{
          backgroundColor: tokens.colors.ui.background__light.hex,
          overflowX: 'scroll',
        }}
        handleSize="small"
      >
        <FilterListContainer>
          {filterValues.map((group) => (
            <FilterColumn
              key={group.name}
              group={group}
              handleFilterItemClick={handleFilterItemClick}
              bulkUpdateFilters={bulkUpdateFilters}
              includeItemCount={includeItemCount}
            />
          ))}
        </FilterListContainer>
      </ResizableContainer>
    </EdsProvider>
  );
};

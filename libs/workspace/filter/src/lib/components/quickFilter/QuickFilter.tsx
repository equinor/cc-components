import { QuickFilterChip, QuickFilterContainer } from './quickFilter.styles';
import { Dropdown } from '@equinor/workspace-core';
import { Typography } from '@equinor/eds-core-react';
import { FilterGroup, FilterValueType } from 'lib/types';
import { ReactElement } from 'react';

type QuickFilterProps = {
  filterValues: FilterGroup[];
  filterChanged: (group: FilterGroup, i: FilterValueType) => void;
  clearFilterGroup: (group: string) => void;
  includeItemCount?: boolean;
};

export function QuickFilter({
  filterChanged,
  filterValues,
  clearFilterGroup,
  includeItemCount,
}: QuickFilterProps): ReactElement | null {
  const selectedHiddenFilters = filterValues.filter(
    (g) => !g.isQuickFilter && g.filterItems.some((fi) => fi.selected)
  ).length;
  if (!filterValues || filterValues.length === 0) {
    return null;
  }
  return (
    <QuickFilterContainer>
      {filterValues
        .filter((g) => g.isQuickFilter)
        .map((group) => (
          <Dropdown
            listItems={group.filterItems.filter(
              (item) => !includeItemCount || item.count === undefined || item.count > 0
            )}
            key={group.name}
            cacheKey={`quickfilter-${group.name}`}
            valueSelected={(value) => {
              filterChanged(group, value);
            }}
            clearAll={() => clearFilterGroup(group.name)}
            valueGetter={(value) => value.value}
            tooltipGetter={(item) =>
              item.descriptions && item.descriptions.length > 0
                ? item.descriptions?.join(' // ')
                : item.value
            }
            customRenderer={(v) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <Typography
                  variant="caption"
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {v.value}
                </Typography>
                {v.count && <Typography variant="caption">{`(${v.count})`}</Typography>}
              </div>
            )}
          >
            <Typography variant="caption">{group.name}</Typography>
          </Dropdown>
        ))}

      {selectedHiddenFilters > 0 && (
        <QuickFilterChip>
          <Typography variant="caption">{`+${selectedHiddenFilters} filter`}</Typography>{' '}
        </QuickFilterChip>
      )}
    </QuickFilterContainer>
  );
}

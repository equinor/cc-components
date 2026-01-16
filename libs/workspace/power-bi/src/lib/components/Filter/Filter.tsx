import { Icon } from '@equinor/eds-core-react';
import { models, Report } from 'powerbi-client';
import { ReactElement, useEffect, useState } from 'react';
import { ActiveFilter, PowerBiFilter, PowerBiFilterItem } from '../../types';
import { getActiveFilterGroupArray } from '../../utils/getActiveFilterGroupArray';
import { getActiveFilterValues } from '../../utils/getActiveFilterValues';
import { getFiltersAsync } from '../../utils/getFiltersAsync';
import { search, playlist_add, drag_handle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Skeleton } from '../skeleton/Skeleton';
import {
  getVisibleFiltersFromLocalStorage,
  useVisibleFilters,
} from '../../hooks/useVisibleFilterGroups';
import styled from 'styled-components';
import { useAppInsights } from '@equinor/workspace-core';
import {
  Filter,
  FilterGroup,
  FilterValueType,
  useFilterContext,
} from '@equinor/workspace-filter';

Icon.add({ search, playlist_add, drag_handle });

export interface FilterController {
  deselectAllValues: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
  handleChangeGroup: (filter: PowerBiFilter) => Promise<void>;
  handleOnSelectAll: (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    allVisibleFilterValues: string[]
  ) => Promise<void>;
  handleOnChange: (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    singleClick?: boolean
  ) => Promise<void>;
  resetFilter: () => Promise<void>;
  isAnyFiltersActive: () => boolean;
  slicerFilters: PowerBiFilter[];
  activeFilters: Record<string, ActiveFilter[]>;
  setIsFilterExpanded: (isExpanded: boolean) => void;
  isFilterExpanded: boolean;
  visibleFilters: string[];
  setVisibleFilters: (visibleGroups: string[]) => void;
}

type PowerBIFilterProps = {
  report: Report;
  defaultFilters?: models.IFilter[];
  usePowerBiFilters?: boolean;
};

export const PowerBIFilter = ({
  report,
  defaultFilters,
  usePowerBiFilters,
}: PowerBIFilterProps): ReactElement | null => {
  const [activeFilters, setActiveFilters] = useState<Record<string, ActiveFilter[]>>({});
  const [slicerFilters, setSlicerFilters] = useState<PowerBiFilter[] | null>(null);
  const [reportRendered, setReportRendered] = useState(false);
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  const [filterGroupVisible, setFilterGroupVisible] = useVisibleFilters(report);
  const [filterValues, setFilterValues] = useState<FilterGroup[]>([]);

  const { filterValues: workspaceFilterValues } = useFilterContext();

  const appInsights = useAppInsights();

  const initFilters = async () => {
    const filters = await getFiltersAsync(report);
    const defaultActiveFilters = await getActiveFilterValues(filters);
    setActiveFilters(defaultActiveFilters);
    setSlicerFilters(filters.sort((a, b) => a.type.localeCompare(b.type)));
    const filterGroupNames = getActiveFilterGroupArray(defaultActiveFilters);
    const reportId = report.getId();
    const state = getVisibleFiltersFromLocalStorage(reportId);
    if (state) {
      setFilterGroupVisible(state);
    } else if (filterGroupNames.length > 0) {
      setFilterGroupVisible((s) =>
        [...s, ...filterGroupNames].filter((v, i, a) => a.indexOf(v) === i)
      );
    } else {
      setFilterGroupVisible(filters.map((s) => s.type));
    }
    setIsFiltersLoading(false);
  };

  useEffect(() => {
    setFilterValues(
      slicerFilters?.map((sFilters) => {
        return {
          name: sFilters.type,
          isQuickFilter:
            usePowerBiFilters ??
            workspaceFilterValues.some(
              (f) => f.name === sFilters.type && f.isQuickFilter
            ),
          filterItems: sFilters.filterVals.map((filter) => {
            const isSelected =
              activeFilters[sFilters.type]?.includes(filter ?? '(Blank)') ?? false;
            return {
              value: filter,
              selected: isSelected,
            };
          }),
        } as FilterGroup;
      }) ?? []
    );
  }, [slicerFilters, activeFilters, workspaceFilterValues]);

  useEffect(() => {
    const handleRendered = async () => {
      if (!reportRendered) {
        initFilters();
        setReportRendered(true);
        report.off('rendered', handleRendered);
      }
    };
    const handlePageChange = async () => {
      setIsFiltersLoading(true);
      report.on('rendered', handleRendered);
    };
    report.on('rendered', handleRendered);
    report.on('pageChanged', handlePageChange);
    return () => {
      report.off('rendered', handleRendered);
      report.off('pageChanged', handlePageChange);
    };
  }, [report]);

  const resetFilters = async () => {
    try {
      setActiveFilters((prev) => {
        const clearedFilters: Record<string, ActiveFilter[]> = {};
        Object.keys(prev).forEach((key) => {
          clearedFilters[key] = [];
        });
        return clearedFilters;
      });
      slicerFilters?.forEach((s) => {
        updatePbiFilters(s.type, []);
      });
    } catch (errors) {
      console.error('Couldnt remove filters', errors);
    }
  };

  if (
    isFiltersLoading ||
    !activeFilters ||
    !slicerFilters ||
    filterGroupVisible.length === 0
  )
    return <QuickFilterLoading />;

  const slicerRecord: Record<string, PowerBiFilter> = {};
  slicerFilters.forEach((s) => {
    slicerRecord[s.type] = s;
  });

  const updatePbiFilters = async (filterName: string, filterValues: ActiveFilter[]) => {
    if (filterValues.length === 0) {
      slicerRecord[filterName].slicer.setSlicerState({ filters: [] });
      return;
    }
    const filter = createFilter(filterName, filterValues);
    slicerRecord[filterName].slicer.setSlicerState({ filters: [filter] });
  };

  const createFilter = (
    filterName: string,
    values: ActiveFilter[]
  ): models.ISlicerFilter => {
    const hasBlank = values.includes('(Blank)');
    hasBlank && values.push('');
    const basicFilter: models.IBasicFilter = {
      $schema: 'http://powerbi.com/product/schema#basic',
      target: Object.values(slicerRecord[filterName].value)[0]?.target!,
      filterType: models.FilterType.Basic,
      operator: values.length > 0 ? 'In' : 'All',
      values: values.filter((v) => v !== null) as (string | number | boolean)[],
    };
    return basicFilter;
  };

  const handleFilterItemClick = async (
    filterGroup: FilterGroup,
    value: FilterValueType
  ) => {
    appInsights?.trackEvent({
      name: `[FilterChanged]: ${filterGroup.name}`,
      properties: {
        filter: value.value,
        filterName: filterGroup.name,
      },
    });
    let values = activeFilters[filterGroup.name]?.includes(value.value)
      ? activeFilters[filterGroup.name].filter((a) => a !== value.value)
      : [...activeFilters[filterGroup.name], value.value];
    setActiveFilters((prev) => ({
      ...prev,
      [filterGroup.name]: values,
    }));
    updatePbiFilters(filterGroup.name, values);
  };

  const resetFilter = (filterGroupName: string, selected: string[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterGroupName]: selected,
    }));
    updatePbiFilters(filterGroupName, selected);
  };

  return (
    <Filter
      filterValues={filterValues}
      handleFilterItemClick={handleFilterItemClick}
      handleBulkFilterUpdate={resetFilter}
      clearFilters={resetFilters}
      hideSearch={true}
      disableSettings={true}
    ></Filter>
  );
};

function QuickFilterLoading() {
  return (
    <StyledQuickFilterLoading>
      {new Array(5).fill(null).map(() => (
        <Skeleton style={{ gridRow: 1 }} height={24} width={160} />
      ))}
    </StyledQuickFilterLoading>
  );
}

const StyledQuickFilterLoading = styled.div`
  height: 48px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, min-content));
  grid-template-rows: 1fr;
  background-color: ${tokens.colors.ui.background__light.hex};
  align-items: center;
  gap: 1em;
  padding-left: 1em;
`;

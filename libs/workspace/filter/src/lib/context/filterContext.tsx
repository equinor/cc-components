import { QueryClient, QueryClientProvider, useQuery, keepPreviousData } from '@tanstack/react-query';
import { FilterDataSource, FilterGroup, FilterStateGroup, FilterStyles } from '../types';
import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useCallback } from 'react';
import { usePersistedState } from '@equinor/workspace-core';

const GROUP_ORDER_KEY = 'workspace.filter.groupOrder';
const QUICK_FILTERS_KEY = 'workspace.filter.quickFilters';
const INCLUDE_COUNT_KEY = 'workspace.filter.includeCount';
const EMPTY_ORDER: string[] = [];

export type IFilterContext = {
  filterState: FilterState;
  setSearchText: (searchText: string) => void;
  filterValues: FilterGroup[];
  selectedItems: Record<string, string[]>;
  setSelectedItems: (newVal: Record<string, string[]>) => void;
  setFilter: (filterName: string, values: string[]) => void;
  clearFilters: () => void;
  clearSettings: () => void;
  reorderFilterGroups: (newOrder: string[]) => void;
  updateQuickFilters: (filterName: string, isQuickFilter: boolean) => void;
  includeCount: boolean;
  setIncludeCount: (include: boolean) => void;
};

export const FilterContext = createContext<null | IFilterContext>(null);

type InitialState = {
  filterState: FilterState;
};

type FilterContextProviderProps = {
  initialState?: InitialState;
  styles?: FilterStyles;
  dataSource?: FilterDataSource;
  onChange?: (state: InitialState) => void;
  appName?: string;
};

export type FilterState = {
  search: string;
  groups: FilterStateGroup[];
  includeCount?: boolean;
};

export const FilterContextProvider = ({
  children,
  styles,
  initialState,
  dataSource,
  onChange,
  appName,
}: PropsWithChildren<FilterContextProviderProps>) => {
  const client = useRef(new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }));

  return (
    <QueryClientProvider client={client.current}>
      <FilterContextWrapper dataSource={dataSource} initialState={initialState} onChange={onChange} appName={appName}>
        {children}
      </FilterContextWrapper>
    </QueryClientProvider>
  );
};

type FilterContextWrapperProps = {
  initialState?: InitialState;
  dataSource?: FilterDataSource;
  onChange?: (state: InitialState) => void;
  children: ReactNode;
  appName?: string;
};

export const FilterContextWrapper = ({
  dataSource,
  initialState,
  children,
  onChange,
  appName,
}: FilterContextWrapperProps) => {
  const LEGACY_STORAGE_PREFIX = appName ?? 'cc_reports';

  const groupOrder = usePersistedState<string[]>(GROUP_ORDER_KEY, {
    legacyKey: `${LEGACY_STORAGE_PREFIX}_filterGroupOrder`,
  });
  const quickFiltersState = usePersistedState<string[]>(QUICK_FILTERS_KEY, {
    legacyKey: `${LEGACY_STORAGE_PREFIX}_quickFilters`,
  });
  const includeCountState = usePersistedState<boolean>(INCLUDE_COUNT_KEY, {
    legacyKey: `${LEGACY_STORAGE_PREFIX}_includeCount`,
  });

  const [filterState, setFilterState] = useState<FilterState>(initialState?.filterState ?? { groups: [], search: '' });
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const quickFilters = quickFiltersState.value;
  const includeCount = includeCountState.value ?? false;
  const query = useQuery<FilterGroup[]>({
    queryKey: ['filter-meta', JSON.stringify(filterState), includeCount],
    queryFn: async ({ signal }): Promise<FilterGroup[]> => {
      const data = await dataSource?.getFilterMeta({ ...filterState, includeCount }, signal);
      return data ?? [];
    },
    enabled: includeCountState.isLoaded,
    throwOnError: false,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    setSelectedItems(
      initialState?.filterState.groups.reduce(
        (acc, group) => {
          acc[group.name] = group.values;
          return acc;
        },
        {} as Record<string, string[]>
      ) || {}
    );
  }, []);

  const setGroupOrder = groupOrder.setValue;
  const setPersistedQuickFilters = quickFiltersState.setValue;
  const setPersistedIncludeCount = includeCountState.setValue;

  const persistedGroupOrder = groupOrder.value ?? EMPTY_ORDER;

  const filterValues = Array.isArray(query.data)
    ? (query.data
        ?.map((group) => ({
          ...group,
          isQuickFilter: quickFilters ? quickFilters.includes(group.name) : group.isQuickFilter,
          filterItems: group.filterItems.map((item) => ({
            ...item,
            selected: selectedItems[group.name]?.includes(item.value),
          })),
        }))
        .sort((a, b) => {
          const indexA = persistedGroupOrder.indexOf(a.name);
          const indexB = persistedGroupOrder.indexOf(b.name);
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        }) ?? [])
    : [];

  const reorderFilterGroups = useCallback(
    (newOrder: string[]) => {
      if (newOrder.length === 0) return;
      setGroupOrder(newOrder);
      setFilterState((prev) => ({
        ...prev,
        groups: newOrder
          .map((name) => prev.groups.find((group) => group.name === name))
          .filter(Boolean) as FilterStateGroup[],
      }));
    },
    [setGroupOrder]
  );

  const setFilter = (filterName: string, values: string[]) => {
    ((window as any).ai as ApplicationInsights)?.trackEvent({
      name: `[FilterChanged]: ${filterName}`,
      properties: {
        filter: values,
        filterName: filterName,
      },
    });
    setSelectedItems((v) => {
      return { ...v, [filterName]: values };
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange({ filterState });
    }
  }, [filterState, onChange]);

  useEffect(() => {
    const activeFilters = Object.keys(selectedItems)
      .filter((key) => selectedItems[key].length > 0)
      .map((key) => {
        return { name: key, values: selectedItems[key] } as FilterStateGroup;
      });
    setFilterState((v) => {
      return { ...v, groups: activeFilters };
    });
  }, [selectedItems]);

  const clearFilters = () => {
    if (!Object.values(selectedItems).some((sI) => sI.length > 0)) return;
    setFilterState({ search: '', groups: [] });
    setSelectedItems({});
  };

  const updatePersistedQuickFilters = (filterName: string, isQuickFilter: boolean) => {
    const currentQuickFilters = quickFilters ?? filterValues.filter((v) => v.isQuickFilter).map((f) => f.name);
    const updatedQuickFilters = isQuickFilter
      ? [...currentQuickFilters, filterName]
      : currentQuickFilters.filter((filter) => filter !== filterName);
    setPersistedQuickFilters(updatedQuickFilters);
  };

  const updatePersistedIncludeCount = (include: boolean) => {
    setPersistedIncludeCount(include);
  };

  const clearSettings = useCallback(() => {
    setGroupOrder(undefined);
    setPersistedQuickFilters(undefined);
    setPersistedIncludeCount(undefined);
  }, [setGroupOrder, setPersistedQuickFilters, setPersistedIncludeCount]);

  return (
    <FilterContext.Provider
      value={{
        filterState,
        setSearchText: (search) => setFilterState((v) => ({ ...v, search: search })),
        filterValues,
        selectedItems,
        setSelectedItems,
        setFilter,
        clearFilters,
        clearSettings,
        reorderFilterGroups,
        updateQuickFilters: updatePersistedQuickFilters,
        includeCount,
        setIncludeCount: updatePersistedIncludeCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const filterContext = useContext(FilterContext);
  if (!filterContext) {
    throw new Error('Filter context used out of bounds');
  }
  return filterContext;
};

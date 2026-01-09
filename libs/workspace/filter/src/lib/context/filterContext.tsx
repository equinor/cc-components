import { QueryClient, QueryClientProvider, useQuery, keepPreviousData } from '@tanstack/react-query';
import { FilterDataSource, FilterGroup, FilterStateGroup, FilterStyles } from '../types';
import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useCallback } from 'react';

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
  const STORAGE_PREFIX = appName ?? 'cc_reports';
  const LOCAL_STORAGE_KEY = `${STORAGE_PREFIX}_filterGroupOrder`;
  const QUICK_FILTERS_KEY = `${STORAGE_PREFIX}_quickFilters`;
  const INCLUDE_COUNT_KEY = `${STORAGE_PREFIX}_includeCount`;

  const getPersistedGroupOrder = (): string[] => {
    const storedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedOrder ? JSON.parse(storedOrder) : [];
  };
  const getPersistedQuickFilters = (): string[] | undefined => {
    const storedFilters = localStorage.getItem(QUICK_FILTERS_KEY);
    return storedFilters ? JSON.parse(storedFilters) : undefined;
  };
  const getPersistedIncludeCount = (): boolean => {
    const storedValue = localStorage.getItem(INCLUDE_COUNT_KEY);
    return storedValue ? JSON.parse(storedValue) : false;
  };

  const [filterState, setFilterState] = useState<FilterState>(initialState?.filterState ?? { groups: [], search: '' });
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [quickFilters, setQuickFilters] = useState<string[] | undefined>(getPersistedQuickFilters());
  const [includeCount, setIncludeCount] = useState<boolean>(getPersistedIncludeCount());
  const query = useQuery<FilterGroup[]>({
    queryKey: ['filter-meta', JSON.stringify(filterState), includeCount],
    queryFn: async ({ signal }): Promise<FilterGroup[]> => {
      const data = await dataSource?.getFilterMeta({ ...filterState, includeCount }, signal);
      return data ?? [];
    },
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

  const saveGroupOrderToLocalStorage = (order: string[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(order));
  };

  const saveQuickFiltersToLocalStorage = (filters: string[]) => {
    localStorage.setItem(QUICK_FILTERS_KEY, JSON.stringify(filters));
  };

  const saveIncludeCountToLocalStorage = (include: boolean) => {
    localStorage.setItem(INCLUDE_COUNT_KEY, JSON.stringify(include));
  };

  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(QUICK_FILTERS_KEY);
    localStorage.removeItem(INCLUDE_COUNT_KEY);
  };

  const persistedGroupOrder = getPersistedGroupOrder();

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

  const reorderFilterGroups = useCallback((newOrder: string[]) => {
    if (newOrder.length === 0) return;
    saveGroupOrderToLocalStorage(newOrder);
    setFilterState((prev) => ({
      ...prev,
      groups: newOrder
        .map((name) => prev.groups.find((group) => group.name === name))
        .filter(Boolean) as FilterStateGroup[],
    }));
  }, []);

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
    setQuickFilters(updatedQuickFilters);
    saveQuickFiltersToLocalStorage(updatedQuickFilters);
  };

  const updatePersistedIncludeCount = (include: boolean) => {
    setIncludeCount(include);
    saveIncludeCountToLocalStorage(include);
  };

  const clearSettings = useCallback(() => {
    resetLocalStorage();
    setQuickFilters(undefined);
    setIncludeCount(false);
  }, []);

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

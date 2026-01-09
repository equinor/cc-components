import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { GardenMeta, GetIdentifier } from '../types';
import { UseSuspenseQueryResult, useSuspenseQuery } from '@tanstack/react-query';
import { GardenDataSource } from '../components';

export type GardenState = {
  selectionService: SelectionService;
  groupingService: GroupingService;
  gardenMetaQuery: ThisType<UseSuspenseQueryResult<GardenMeta, unknown>>;
};

type GroupingService = {
  groupingKeys: string[];
  timeInterval: string | null;
  dateVariant: string | null;
  summaryKey: string | null;
};

type SelectionService = {
  selection: string | null;
  selectNode: (item: Record<PropertyKey, unknown>) => void;
  clearSelection: VoidFunction;
  setSummaryKey: (key: string | null) => void;
};

export const GardenContext = createContext<GardenState | null>(null);

export const GardenContextProvider = <T, TContext = undefined>(
  props: PropsWithChildren<{
    getIdentifier: GetIdentifier<T>;
    selected: string | null;
    initialGrouping: string[];
    timeInterval: string | null;
    dateVariant: string | null;
    dataSource: GardenDataSource<TContext>;
    context: TContext | undefined;
  }>
) => {
  const [summaryKey, setSummaryKey] = useState<string | null>(null);

  useEffect(() => {
    setSummaryKey(props.initialGrouping[0]);
  }, [props.initialGrouping[0]]);

  const gardenMetaQuery = useSuspenseQuery({
    queryKey: ['garden', ...props.initialGrouping, props.timeInterval, props.dateVariant, props.context],
    queryFn: ({ signal }) => {
      return props.dataSource.getGardenMeta(
        { groupingKeys: props.initialGrouping, timeInterval: props.timeInterval, dateVariant: props.dateVariant },
        props.context as TContext,
        signal ?? new AbortSignal()
      );
    },
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const selectionService = useSelectionService(props.getIdentifier, props.selected, setSummaryKey);
  const groupingService = useGroupingService(props.initialGrouping, props.timeInterval, props.dateVariant, summaryKey);

  return (
    <GardenContext.Provider value={{ groupingService, selectionService, gardenMetaQuery }}>
      {props.children}
    </GardenContext.Provider>
  );
};

const useSelectionService = <T,>(
  getIdentifier: GetIdentifier<T>,
  initialSelected: string | null,
  setSummaryKey: (key: string | null) => void
): SelectionService => {
  const [selection, set] = useState<string | null>(initialSelected);

  useEffect(() => {
    set(initialSelected);
  }, [initialSelected]);

  const clearSelection = useCallback(() => set(null), [set]);
  const selectNode = useCallback(
    (item: T) => {
      set(getIdentifier(item));
    },
    [set, getIdentifier]
  );
  return {
    clearSelection,
    selection,
    selectNode: selectNode as (item: Record<PropertyKey, unknown>) => void,
    setSummaryKey,
  };
};

const useGroupingService = (
  initialGrouping: string[],
  timeInterval: string | null,
  dateVariant: string | null,
  summaryKey: string | null
): GroupingService => {
  return {
    groupingKeys: initialGrouping,
    timeInterval: timeInterval,
    dateVariant: dateVariant,
    summaryKey: summaryKey,
  };
};

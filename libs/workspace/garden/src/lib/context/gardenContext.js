import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
export const GardenContext = createContext(null);
export const GardenContextProvider = (props) => {
    const [summaryKey, setSummaryKey] = useState(null);
    useEffect(() => {
        setSummaryKey(props.initialGrouping[0]);
    }, [props.initialGrouping[0]]);
    const gardenMetaQuery = useSuspenseQuery({
        queryKey: ['garden', ...props.initialGrouping, props.timeInterval, props.dateVariant, props.context],
        queryFn: ({ signal }) => {
            return props.dataSource.getGardenMeta({ groupingKeys: props.initialGrouping, timeInterval: props.timeInterval, dateVariant: props.dateVariant }, props.context, signal ?? new AbortSignal());
        },
        refetchOnWindowFocus: false,
        gcTime: Infinity,
        staleTime: Infinity,
    });
    const selectionService = useSelectionService(props.getIdentifier, props.selected, setSummaryKey);
    const groupingService = useGroupingService(props.initialGrouping, props.timeInterval, props.dateVariant, summaryKey);
    return (_jsx(GardenContext.Provider, { value: { groupingService, selectionService, gardenMetaQuery }, children: props.children }));
};
const useSelectionService = (getIdentifier, initialSelected, setSummaryKey) => {
    const [selection, set] = useState(initialSelected);
    useEffect(() => {
        set(initialSelected);
    }, [initialSelected]);
    const clearSelection = useCallback(() => set(null), [set]);
    const selectNode = useCallback((item) => {
        set(getIdentifier(item));
    }, [set, getIdentifier]);
    return {
        clearSelection,
        selection,
        selectNode: selectNode,
        setSummaryKey,
    };
};
const useGroupingService = (initialGrouping, timeInterval, dateVariant, summaryKey) => {
    return {
        groupingKeys: initialGrouping,
        timeInterval: timeInterval,
        dateVariant: dateVariant,
        summaryKey: summaryKey,
    };
};

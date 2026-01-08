import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { useFilterContext } from '@equinor/workspace-filter';
import { StatusBar } from './StatusBar';
import { KPISkeletons } from './StyledSkeletons';
export function StatusBarWrapper({ config }) {
    const { filterState } = useFilterContext();
    const { data, isLoading } = useQuery({
        queryKey: ['kpis', filterState],
        queryFn: (a) => config(filterState, a.signal),
        placeholderData: (prev) => prev,
    });
    if (isLoading || !data) {
        return _jsx(KPISkeletons, {});
    }
    return _jsx(StatusBar, { items: data });
}

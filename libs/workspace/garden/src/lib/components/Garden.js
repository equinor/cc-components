import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from '@equinor/eds-core-react';
import { Suspense, useRef, useState } from 'react';
import { VirtualContainer } from './VirtualContainer/VirtualContainer';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { GardenConfigProvider } from '../context/gardenConfig';
import { GardenContextProvider } from '../context/gardenContext';
import { ViewSettings } from './ViewSettings/ViewSettings';
import { GardenError } from './error/GardenError';
import { SplashScreen } from './splashScreen/SplashScreen';
Icon.add({ chevron_down, chevron_up });
export function Garden({ dataSource, getDisplayName, context, getIdentifier, groupingKeys: initialGrouping, customViews, timeInterval: initialTimeInterval, dateVariant: initialDateVariant, visuals, clickEvents, selected = null, refState, }) {
    const client = useRef(new QueryClient());
    const [groupingKeys, setGroupingKeys] = useState(initialGrouping);
    const [isLoading, setIsLoading] = useState(true);
    const [timeInterval, updateTimeInterval] = useState(initialTimeInterval ?? null);
    const onChangetimeInterval = (timeInterval) => {
        updateTimeInterval(timeInterval);
    };
    const [dateVariant, updateDateVariant] = useState(initialDateVariant ?? null);
    const onChangeDateVariant = (dateVariant) => {
        updateDateVariant(dateVariant);
    };
    if (refState) {
        if (typeof refState == 'function') {
            refState({ dateVariant, groupingKeys, timeInterval });
        }
        else {
            refState.current = { dateVariant, timeInterval, groupingKeys };
        }
    }
    return (_jsx(QueryClientProvider, { client: client.current, children: _jsx(ErrorBoundary, { FallbackComponent: () => _jsx(GardenError, {}), children: _jsx(Suspense, { fallback: _jsx(SplashScreen, {}), children: _jsx(GardenContextProvider, { getIdentifier: getIdentifier, timeInterval: timeInterval, context: context, dataSource: dataSource, dateVariant: dateVariant, initialGrouping: groupingKeys, selected: selected, children: _jsxs(GardenConfigProvider, { dataSource: dataSource, getDisplayName: getDisplayName, getIdentifier: getIdentifier, clickEvents: clickEvents, context: context, customViews: customViews, visuals: visuals, children: [_jsx(VirtualContainer, { context: context, dataSource: dataSource, setIsLoading: setIsLoading }), selected || isLoading ? null : (_jsx(ViewSettings, { dateVariant: dateVariant, groupingKeys: groupingKeys, timeInterval: timeInterval, onChangeDateVariant: onChangeDateVariant, onChangeTimeInterval: onChangetimeInterval, setGroupingKeys: setGroupingKeys }))] }) }) }) }) }));
}

import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback } from 'react';
import { useGarden } from '../hooks/useGarden';
import { DefaultGardenItem, DefaultGroupView, DefaultHeaderView } from '../components/defaultComponents';
export const GardenConfigContext = createContext(null);
export function GardenConfigProvider(props) {
    const { selectionService: { selectNode }, } = useGarden();
    const onClickItem = useCallback((item) => {
        selectNode(item);
        props.clickEvents?.onClickItem && props.clickEvents.onClickItem(item);
    }, [selectNode, props.clickEvents?.onClickItem]);
    const onClickGroup = useCallback((item) => {
        props.clickEvents?.onClickGroup && props.clickEvents.onClickGroup(item);
    }, [props.clickEvents?.onClickGroup]);
    const customItemView = props.customViews?.customItemView ?? DefaultGardenItem;
    const customHeaderView = props.customViews?.customHeaderView ?? DefaultHeaderView;
    const customGroupView = props.customViews?.customGroupView ?? DefaultGroupView;
    return (_jsx(GardenConfigContext.Provider, { value: {
            dataSource: props.dataSource,
            getDisplayName: props.getDisplayName,
            getIdentifier: props.getIdentifier,
            onClickGroup,
            onClickItem,
            components: {
                customItemView,
                customGroupView,
                customHeaderView,
            },
            context: props.context,
            visuals: props.visuals ?? {},
        }, children: props.children }));
}

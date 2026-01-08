import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useItemWidths } from '../../hooks';
import { useGarden } from '../../hooks/useGarden';
import { useGardenConfig } from '../../hooks/useGardenConfig';
import { ExpandProvider } from '../ExpandProvider';
import { VirtualGarden } from '../VirtualGarden';
import { SplashScreen } from '../splashScreen/SplashScreen';
import { StyledVirtualContainer } from './virtualContainer.styles';
Icon.add({ info_circle });
export const VirtualContainer = ({ dataSource, context, setIsLoading, }) => {
    const { onClickItem } = useGardenConfig();
    const { gardenMetaQuery } = useGarden();
    if (gardenMetaQuery.isLoading) {
        return _jsx(SplashScreen, {});
    }
    // TODO: Refactor this, lift useQuery and remove setstate
    //https://react.dev/learn/you-might-not-need-an-effect
    useEffect(() => {
        if (!gardenMetaQuery.isLoading)
            setIsLoading(false);
    }, [gardenMetaQuery.isLoading]);
    if (!gardenMetaQuery.data) {
        // Will never happen when suspense is true
        throw new Error();
    }
    const { data } = gardenMetaQuery;
    const amountOfColumns = data.columnCount;
    const columnWidth = data.columnWidth || 300;
    const widths = useItemWidths(data.columnCount, columnWidth);
    if (!amountOfColumns) {
        return (_jsxs(InfoMessage, { children: [_jsx(Icon, { name: "info_circle", size: 32 }), _jsx("p", { children: "Sorry, we couldn't find any results based on your search and filter criteria. Please try using different keywords or adjusting the filters" })] }));
    }
    //TODO: Handle widths = 0 better
    if (widths.length === 0 || amountOfColumns !== widths.length) {
        return null;
    }
    if (widths.length !== amountOfColumns) {
        return null;
    }
    return (_jsx(_Fragment, { children: _jsx(StyledVirtualContainer, { id: 'garden_root', children: _jsx(ExpandProvider, { initialWidths: widths, defaultColumnWidth: columnWidth, children: _jsx(VirtualGarden, { context: context, getSubgroupItems: dataSource.getSubgroupItems, meta: data, getBlockAsync: dataSource.getBlockAsync, width: widths[0], handleOnItemClick: (item) => onClickItem && onClickItem(item), getHeader: dataSource.getHeader }) }) }) }));
};
const InfoMessage = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18;
`;

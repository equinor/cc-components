import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { ActionType } from '../ExpandProvider';
import { Header, HeaderRoot } from './headerContainer.styles';
import { useExpand, useExpandDispatch } from '../../hooks/useExpand';
import { useBlockCache } from '../../hooks/useBlockCache';
import { findBlockCacheEntry, getBlocksInView } from '../VirtualGarden';
import { SkeletonPackage } from '../gardenSkeleton/GardenSkeleton';
import { makeBlocks } from '../../utils/gardenBlock';
import { useGardenConfig } from '../../hooks/useGardenConfig';
import { useGarden } from '../../hooks/useGarden';
export const HeaderContainer = ({ columnVirtualizer, highlightedColumn, blockSqrt, columnCount, columnEnd, columnStart, context, getHeader, }) => {
    const blocks = makeBlocks({ blockSqrt, columnCount, rowCount: 1 });
    const blocksInView = getBlocksInView(columnStart, columnEnd, 0, 0, blockSqrt);
    const blockCache = useBlockCache({
        blocks: blocks,
        blocksInView: blocksInView,
        blockSqrt: blockSqrt,
        context: context,
        hash: ['header'],
        getBlockAsync: getHeader,
    });
    const { components: { customHeaderView: HeaderChild }, visuals: { headerHeight }, } = useGardenConfig();
    const { groupingService: { groupingKeys }, } = useGarden();
    const gardenKey = groupingKeys.at(0);
    const expandColumn = useExpandDispatch();
    const expanded = useExpand();
    const handleHeaderClick = useCallback((index) => {
        expandColumn({
            type: ActionType.EXPAND_COLUMN,
            index,
        });
    }, [expandColumn]);
    if (!HeaderChild)
        throw new Error('No header component registered');
    const getBlockCache = (block) => findBlockCacheEntry(block, blocks, blockCache);
    return (_jsx(HeaderRoot, { children: columnVirtualizer.virtualItems.map((virtualColumn) => {
            const columnExpanded = !!expanded.expandedColumns.find((s) => s === virtualColumn.index);
            const blockXIndex = Math.floor(virtualColumn.index / blockSqrt);
            /** Find current blocks yIndex */
            /** Get query entry for current block */
            const { isLoading, data, error, refetch } = getBlockCache({ x: blockXIndex, y: 0 });
            if (isLoading) {
                return (_jsx(Header, { style: {
                        width: `${virtualColumn.size}px`,
                        transform: `translateX(${virtualColumn.start}px) translateY(0px)`,
                        backgroundColor: '#f7f7f7',
                    }, children: _jsx(SkeletonPackage, { height: headerHeight || 35, width: 200 }) }, virtualColumn.key));
            }
            if (error || !data) {
                // TODO: fix
                return _jsx("div", { children: "rip" }, virtualColumn.key);
            }
            const header = data[virtualColumn.index % blockSqrt];
            const isHighlighted = highlightedColumn === virtualColumn.index;
            return (_jsx(Header
            /**TODO: fix handle expand */
            , { 
                /**TODO: fix handle expand */
                onClick: () => handleHeaderClick(virtualColumn.index), style: {
                    width: `${virtualColumn.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(0px)`,
                    backgroundColor: isHighlighted ? '#007079' : '#f7f7f7',
                    color: isHighlighted ? 'white' : 'black',
                }, children: _jsx(HeaderChild, { header: header, columnIndex: virtualColumn.index, columnIsExpanded: columnExpanded, groupByKey: gardenKey }) }, virtualColumn.key));
        }) }));
};

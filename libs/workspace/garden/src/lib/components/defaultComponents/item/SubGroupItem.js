import { jsx as _jsx } from "react/jsx-runtime";
import { StyledPackageRoot } from '../../GardenItemContainer/gardenItemContainer.styles';
import { ErrorPackage } from '../../virtualPackages/ErrorPackage';
import { LoadingPackageSkeleton } from '../../virtualPackages/LoadingPackage';
import { defaultItemColor } from '../../../utils';
import { useGarden } from '../../../hooks/useGarden';
import { useGardenConfig } from '../../../hooks/useGardenConfig';
import { useSettings } from '@equinor/workspace-core';
export const SubGroupItem = ({ query, virtualColumn, virtualRow, itemWidth, rowHeight, groupingKeys, PackageChild, isExpanded, onClick, itemIndex, parentRef, }) => {
    const { colorAssistMode } = useSettings();
    const { selectionService: { selection }, } = useGarden();
    const { getIdentifier, visuals: { itemColor = defaultItemColor, getDescription = () => '' }, getDisplayName, } = useGardenConfig();
    const { isLoading, error, data, refetch } = query;
    if (isLoading) {
        /** Skeleton loading state */
        return (_jsx(LoadingPackageSkeleton, { itemWidth: itemWidth ?? 50, rowHeight: rowHeight, virtualColumn: virtualColumn, virtualRow: virtualRow }));
    }
    if (!data || error) {
        /** Error state */
        return (_jsx(ErrorPackage, { itemWidth: itemWidth, refetch: refetch, rowHeight: rowHeight, virtualColumn: virtualColumn, virtualRow: virtualRow }));
    }
    const item = data[itemIndex];
    const color = itemColor;
    return (_jsx(StyledPackageRoot, { style: {
            translate: `${virtualColumn.start}px ${virtualRow.start}px`,
            width: `${virtualColumn.size}px`,
            height: `${virtualRow.size}px`,
            cursor: 'pointer',
        }, children: _jsx(PackageChild, { groupingKeys: groupingKeys, colorAssistMode: colorAssistMode, columnExpanded: isExpanded, displayName: getDisplayName(item), description: getDescription?.(item), color: color, data: item, isSelected: selection === getIdentifier(item), onClick: () => onClick(item), width: itemWidth, depth: 0, rowStart: virtualRow.start, columnStart: virtualColumn.start, parentRef: parentRef }) }, virtualRow.index));
};

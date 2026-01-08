import { jsx as _jsx } from "react/jsx-runtime";
import { StyledPackageRoot } from '../GardenItemContainer/gardenItemContainer.styles';
import { SkeletonPackage } from '../gardenSkeleton/GardenSkeleton';
export const LoadingPackageSkeleton = ({ itemWidth, rowHeight, virtualColumn, virtualRow, }) => (_jsx(StyledPackageRoot, { style: {
        translate: `${virtualColumn.start}px ${virtualRow.start}px`,
        width: `${virtualColumn.size}px`,
        height: `${virtualRow.size}px`,
    }, children: _jsx(SkeletonPackage, { height: rowHeight - 5, width: (itemWidth ?? 50) - 5 }) }, virtualRow.key));

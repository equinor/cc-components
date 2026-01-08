import { jsx as _jsx } from "react/jsx-runtime";
import { tokens } from '@equinor/eds-tokens';
import { StyledPackageRoot } from '../GardenItemContainer/gardenItemContainer.styles';
/**
 * The item to show when a garden package fails to load
 */
export const ErrorPackage = ({ itemWidth, refetch, rowHeight, virtualColumn, virtualRow }) => (_jsx(StyledPackageRoot, { title: "Click to retry", style: {
        translate: `${virtualColumn.start}px ${virtualRow.start}px`,
        width: `${virtualColumn.size}px`,
        height: `${virtualRow.size}px`,
        cursor: 'pointer',
    }, onClick: () => refetch(), children: _jsx("div", { style: {
            height: rowHeight - 5,
            width: (itemWidth ?? 50) - 5,
            background: tokens.colors.interactive.danger__resting.hex,
            borderRadius: '5px',
        } }) }, virtualRow.key));

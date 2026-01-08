import { jsx as _jsx } from "react/jsx-runtime";
import { StyledLayoutContainer, StyledLayoutRoot } from './layout.styles';
/**
 * Main container of the virtualized garden.
 * Sets the component to fit the whole screen and enables scrolling when overflowing.
 * The inner div will be positioned relative and have the widths and heights from
 * useVirtual hooks.
 * pointerEvents is just for optimization, turned off when user is scrolling.
 */
export const Layout = (props) => {
    const { columnTotalSize, rowTotalSize, parentRef, containerRef, isScrolling, children } = props;
    return (_jsx(StyledLayoutRoot, { ref: parentRef, children: _jsx(StyledLayoutContainer, { width: columnTotalSize, height: rowTotalSize, isScrolling: isScrolling, ref: containerRef, children: children }) }));
};

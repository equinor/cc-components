import { jsx as _jsx } from "react/jsx-runtime";
import { tokens } from '@equinor/eds-tokens';
import { createContext, useState } from 'react';
import { Resizable } from 're-resizable';
export const ResizeContext = createContext(null);
export const ResizeProvider = ({ children, defaultWidth, minWidth }) => {
    const [width, setWidth] = useState(defaultWidth);
    const [isMinimized, setIsMinimized] = useState(false);
    return (_jsx(ResizeContext.Provider, { value: { isMinimized, setIsMinimized, setWidth, width }, children: _jsx(Resizable, { size: { width: width, height: '100%' }, style: { border: `2px solid ${tokens.colors.ui.background__medium.hex}`, overflow: 'hidden' }, maxWidth: '100vw', boundsByDirection: true, minHeight: '100%', onResizeStop: (e, direction, ref, d) => {
                if (width + d.width < minWidth) {
                    setIsMinimized(true);
                }
                else {
                    setWidth(width + d.width);
                }
            }, children: children }) }));
};

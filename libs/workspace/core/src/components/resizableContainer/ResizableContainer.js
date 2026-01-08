import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
const Container = styled.div `
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height}px;
  width: 100%;
`;
const Handle = styled.div `
  height: 4px;
  cursor: ns-resize;
  background-color: ${tokens.colors.ui.background__medium.hex};
  width: 30px;
  border-radius: 4px;
  &:not(:first-child) {
    margin-top: 2px;
  }
`;
const BottomEdge = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: ns-resize;
  width: 100%;
  padding: 2px 0;
  border-top: 2px solid ${tokens.colors.ui.background__medium.hex};
  background-color: inherit;
`;
export const ResizableContainer = ({ children, handleSize, style }) => {
    const [height, setHeight] = useState(300); // Initial height
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const handleMouseDown = (e) => {
        e.preventDefault();
        const startY = e.clientY;
        const startHeight = containerRef.current?.offsetHeight;
        setDragging(true);
        const handleMouseMove = (e) => {
            if (!startHeight)
                return;
            const newHeight = startHeight + (e.clientY - startY);
            setHeight(newHeight);
        };
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            setDragging(false);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };
    return (_jsxs(_Fragment, { children: [dragging &&
                createPortal(_jsx("div", { style: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 999,
                    } }), document.body), _jsx(Container, { ref: containerRef, height: height, style: style, children: children }), _jsxs(BottomEdge, { onMouseDown: handleMouseDown, children: [_jsx(Handle, {}), handleSize === 'large' && _jsx(Handle, {})] })] }));
};
export default ResizableContainer;

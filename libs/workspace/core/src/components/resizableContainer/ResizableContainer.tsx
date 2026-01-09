import { tokens } from '@equinor/eds-tokens';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Container = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height}px;
  width: 100%;
`;

const Handle = styled.div`
  height: 4px;
  cursor: ns-resize;
  background-color: ${tokens.colors.ui.background__medium.hex};
  width: 30px;
  border-radius: 4px;
  &:not(:first-child) {
    margin-top: 2px;
  }
`;

const BottomEdge = styled.div`
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

interface ResizableContainerProps {
  children: React.ReactNode;
  handleSize?: 'small' | 'large';
  style?: React.CSSProperties;
}

export const ResizableContainer: React.FC<ResizableContainerProps> = ({ children, handleSize, style }) => {
  const [height, setHeight] = useState(300); // Initial height
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = containerRef.current?.offsetHeight;
    setDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!startHeight) return;
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

  return (
    <>
      {dragging &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 999,
            }}
          />,
          document.body
        )}
      <Container ref={containerRef} height={height} style={style}>
        {children}
      </Container>
      <BottomEdge onMouseDown={handleMouseDown}>
        <Handle />
        {handleSize === 'large' && <Handle />}
      </BottomEdge>
    </>
  );
};

export default ResizableContainer;

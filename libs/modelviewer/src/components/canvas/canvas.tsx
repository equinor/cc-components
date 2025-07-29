import styled from 'styled-components';
import { RefObject } from 'react';

type CanvasProps = {
  viewerRef: RefObject<HTMLCanvasElement | null>;
};

export const Canvas = ({ viewerRef }: CanvasProps) => {
  return (
    <ViewerWrapper>
      <StyledCanvas
        ref={viewerRef}
        onContextMenu={(e) => {
          e.preventDefault(); // Prevent the right-click menu on the canvas
        }}
      />
    </ViewerWrapper>
  );
};

export default Canvas;
const StyledCanvas = styled.canvas``;

const ViewerWrapper = styled.div`
  height: inherit;
  position: relative;
  overflow: hidden;
  > .reveal-viewer-spinner {
    display: none;
  }
`;

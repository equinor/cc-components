import styled from 'styled-components';
import { useModelViewerContext } from '../../providers/modelViewerProvider';

const Canvas = ({}) => {
  const { viewerRef } = useModelViewerContext();

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
  overflow: hidden;
  > .reveal-viewer-spinner {
    display: none;
  }
`;

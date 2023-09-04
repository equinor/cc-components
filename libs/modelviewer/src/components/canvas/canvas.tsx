import styled from 'styled-components';
import { useModelViewerContext } from '../../providers/modelViewerProvider';

const Canvas = ({}) => {
  const { viewerRef } = useModelViewerContext();

  return (
    <StyledCanvas
      ref={viewerRef}
      onContextMenu={(e) => {
        e.preventDefault(); // Prevent the right-click menu on the canvas
      }}
    />
  );
};

export default Canvas;
const StyledCanvas = styled.canvas``;

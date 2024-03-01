import { ModelViewer, ModelViewerConfig, TagOverlay } from '@cc-components/modelviewer';
import styled from 'styled-components';

type ModelViewerProps = {
  facility: string;
  tagsOverlay?: string[] | TagOverlay[];
  options?: ModelViewerConfig;
};

const StyledWrapper = styled.div`
  height: calc(100vh - 276px);
  overflow: hidden;
  position: relative;
`;

export const ModelViewerWidget = ({ facility, options, tagsOverlay }: ModelViewerProps) => {
  return (
    <StyledWrapper>
      <ModelViewer facility={facility} options={options} tagsOverlay={tagsOverlay} />
    </StyledWrapper>
  );
};

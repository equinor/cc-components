import {
  FusionModelViewer,
  ModelViewerConfig,
  TagOverlay,
} from '@cc-components/modelviewer';
import styled from 'styled-components';

type FusionModelViewerProps = {
  facility: string;
  tagsOverlay?: string[] | TagOverlay[];
  options?: ModelViewerConfig;
};

const StyledWrapper = styled.div`
  height: calc(100vh - 276px);
  overflow: hidden;
  position: relative;
`;

export const ModelViewerWidget = ({
  facility,
  options,
  tagsOverlay,
}: FusionModelViewerProps) => {
  return (
    <StyledWrapper>
      <FusionModelViewer
        facility={facility}
        options={options}
        tagsOverlay={tagsOverlay}
      />
    </StyledWrapper>
  );
};

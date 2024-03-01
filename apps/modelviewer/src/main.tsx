import { ModelViewer, useCustomAction } from '@cc-components/modelviewer';
import { configure } from '@cc-components/modelviewerapp';
import { createRender } from '@cc-components/shared';
import { Button, Icon } from '@equinor/eds-core-react';
import { alarm, badge } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const mockedTagListA = ['30L06200A', '30XV6200', '30L06200B'];

const mockedTagListB = ['30L06100B', '30XV6100', '30L06100A'];

Icon.add({ badge, alarm });

const Test = () => {
  const { selectNodesByTags } = useCustomAction();
  return (
    <>
      <Button
        variant="ghost_icon"
        title="Set Selection A"
        onClick={() => selectNodesByTags(mockedTagListA)}
      >
        <Icon
          name="alarm"
          color={true ? tokens.colors.text.static_icons__secondary.rgba : undefined}
        />
      </Button>
      <Button
        variant="ghost_icon"
        title="Set Selection B"
        onClick={() => selectNodesByTags(mockedTagListB)}
      >
        <Icon
          name="badge"
          color={true ? tokens.colors.text.static_icons__secondary.rgba : undefined}
        />
      </Button>
    </>
  );
};

const StyledWrapper = styled.div`
  height: calc(100vh - 48px);
  overflow: hidden;
`;

const App = () => {
  return (
    <StyledWrapper>
      <ModelViewer facility="jca" tagsOverlay={mockedTagListA}>
        <ModelViewer.CustomActions>
          <Test />
        </ModelViewer.CustomActions>
      </ModelViewer>
    </StyledWrapper>
  );
};

export const render = createRender(App, configure);
export default render;

import { ModelViewer, TagOverlay, useCustomAction } from '@cc-components/modelviewer';
import { configure } from '@cc-components/modelviewerapp';
import { createRender } from '@cc-components/shared';
import { Button, Icon } from '@equinor/eds-core-react';
import { alarm, badge } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const mockedTagListA = [
  { tagNo: '30L06200A', status: 'AB', description: 'This is a description 1' },
  { tagNo: '30XV6200', status: 'AA', description: 'This is a description 2' },
  { tagNo: '30L06200B', status: 'AI', description: 'This is a description 3' },
  { tagNo: 'NO-EXISTS', status: 'AA', description: 'This is a description 4' },
];

const mockedTagListB = ['30L06100B', '30XV6100', '30L06100A'];

Icon.add({ badge, alarm });

const Test = () => {
  const { selectNodesByTags } = useCustomAction();

  return (
    <>
      <Button
        variant="ghost_icon"
        title="Set Selection A"
        onClick={() => selectNodesByTags(['30L06200A'])}
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
  const tagsOverlay: TagOverlay[] = mockedTagListA.map((tag) => ({
    key: tag.tagNo,
    tagNo: tag.tagNo,
    description: tag.description,
    status: tag.status,
  }));

  return (
    <StyledWrapper>
      <ModelViewer facility="jca" tagsOverlay={tagsOverlay}>
        <ModelViewer.CustomActions>
          <Test />
        </ModelViewer.CustomActions>
      </ModelViewer>
    </StyledWrapper>
  );
};

export const render = createRender(App, configure);
export default render;

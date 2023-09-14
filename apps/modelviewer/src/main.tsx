import { FusionModelViewer, useCustomAction } from '@cc-components/modelviewer';
import { configure } from '@cc-components/modelviewerapp';
import { createRender } from '@cc-components/shared';
import { Button, Icon } from '@equinor/eds-core-react';
import { navigation, alarm } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

const mockedTagList = [
  '30L06200A',
  '30XV6200',
  '30L06200B',
  '30L06100B',
  '30XV6100',
  '30L06100A',
];

Icon.add({ navigation, alarm });

const Test = () => {
  const { selectNodesByTags } = useCustomAction();
  return (
    <Button
      variant="ghost_icon"
      title="Set Selection A"
      onClick={() => selectNodesByTags(mockedTagList)}
    >
      <Icon
        name="navigation"
        color={true ? tokens.colors.text.static_icons__secondary.rgba : undefined}
      />
    </Button>
  );
};

const Test2 = () => {
  const { selectNodesByTags } = useCustomAction();
  return (
    <Button
      variant="ghost_icon"
      title="Set Selection A"
      onClick={() => selectNodesByTags(mockedTagList)}
    >
      <Icon
        name="alarm"
        color={true ? tokens.colors.text.static_icons__secondary.rgba : undefined}
      />
    </Button>
  );
};

const App = () => {
  return (
    <FusionModelViewer plantName="Johan Castberg" plantCode="jca">
      <FusionModelViewer.Actions>
        <Test />
        <Test2 />
      </FusionModelViewer.Actions>
    </FusionModelViewer>
  );
};

export const render = createRender(App, configure);
export default render;

import { Button, Icon } from '@equinor/eds-core-react';
import { crop, fullscreen, rotate_3d, visibility } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { useActions } from '../../providers/actionProvider';
import { ColorPaletteMenu } from '../action-color-palette-menu/action-color-palette-menu';
import { ModelSettingsMenu } from '../action-model-settings-menu/action-model-settings-menu';

Icon.add({ crop, visibility, fullscreen, rotate_3d });

type ActionsMenuProps = {
  CustomActions?: ReactNode;
};

export const ActionsMenu = (props: ActionsMenuProps) => {
  const {
    isClipped,
    isOrbit,
    isFocus,
    toggleFocus,
    toggleClipping,
    fitToScreen,
    toggleCameraMode,
  } = useActions();

  return (
    <StyledWrapperActionsBar>
      <StyledActionsBar>
        {renderIconButton('crop', 'Crop Selection', toggleClipping, isClipped)}
        {renderIconButton('visibility', 'Show selection only', toggleFocus, isFocus)}
        <ColorPaletteMenu />
        {props.CustomActions}
        {renderIconButton('fullscreen', 'Fit to screen', fitToScreen, null)}
        {renderIconButton('rotate_3d', 'Free Camera / Orbit', toggleCameraMode, isOrbit)}
        <ModelSettingsMenu />
      </StyledActionsBar>
    </StyledWrapperActionsBar>
  );
};

const renderIconButton = (
  iconName: string,
  title: string,
  onClick: () => void,
  isActive: boolean | null
) => (
  <Button variant="ghost_icon" title={title} onClick={onClick}>
    <Icon
      name={iconName}
      color={isActive ? undefined : tokens.colors.text.static_icons__secondary.rgba}
    />
  </Button>
);

const StyledActionsBar = styled.div`
  display: flex;
  bottom: 50px;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 50px;

  > button {
    margin: 0rem 0.25rem;
  }
`;

const StyledWrapperActionsBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 50px;
  width: 100%;
`;

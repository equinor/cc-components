import { Button, Icon } from '@equinor/eds-core-react';
import { crop, fullscreen, rotate_3d, visibility } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { useActions } from '../../providers/actionProvider';
import { ColorPaletteMenu } from '../action-color-palette-menu/action-color-palette-menu';
import { ModelSettingsMenu } from '../action-model-settings-menu/action-model-settings-menu';

Icon.add({ crop, visibility, fullscreen, rotate_3d });

export const ActionsMenu = () => {
  const {
    isClipped,
    isOrbit,
    isFocus,
    toggleFocus,
    toggleClipping,
    fitToScreen,
    toggleCameraMode,
  } = useActions();

  const renderIconButton = (
    iconName: string,
    title: string,
    onClick: () => void,
    isActive: boolean | null
  ) => (
    <Button variant="ghost_icon" title={title} onClick={onClick}>
      <Icon
        name={iconName}
        color={
          isActive ? tokens.colors.text.static_icons__secondary.rgba : undefined
        }
      />
    </Button>
  );

  return (
    <WrapperActionsBar>
      <ActionsBar>
        {renderIconButton('crop', 'Crop Selection', toggleClipping, isClipped)}
        {renderIconButton('visibility', 'Show selection only', toggleFocus, !isFocus)}
        <ColorPaletteMenu />
        {renderIconButton('fullscreen', 'Fit to screen', fitToScreen, null)}
        {renderIconButton('rotate_3d', 'Free Camera / Orbit', toggleCameraMode, !isOrbit)}
        <ModelSettingsMenu />
      </ActionsBar>
    </WrapperActionsBar>
  );
};

const ActionsBar = styled.div`
  display: flex;
  bottom: 50px;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 50px;

  > button {
    margin: 0rem 0.25rem;
  }
`;

const WrapperActionsBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 50px;
  width: 100%;
`;

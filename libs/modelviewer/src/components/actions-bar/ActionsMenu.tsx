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
        <IconButton
          iconName="crop"
          title="Crop Selection"
          onClick={() => toggleClipping()}
          isActive={isClipped}
        />
        <IconButton
          iconName="visibility"
          title="Show selection only"
          onClick={() => toggleFocus()}
          isActive={isFocus}
        />
        <ColorPaletteMenu />
        {props.CustomActions}
        <IconButton
          iconName="fullscreen"
          title="Fit to screen"
          onClick={() => fitToScreen()}
          isActive={null}
        />
        <IconButton
          iconName="rotate_3d"
          title="Free Camera / Orbit"
          onClick={() => toggleCameraMode()}
          isActive={isOrbit}
        />
        <ModelSettingsMenu />
      </StyledActionsBar>
    </StyledWrapperActionsBar>
  );
};

interface IconButtonProps {
  iconName: string;
  title: string;
  onClick: () => void;
  isActive: boolean | null;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  title,
  onClick,
  isActive,
}) => (
  <Button variant="ghost_icon" title={title} onClick={onClick}>
    <Icon
      name={iconName}
      color={
        isActive !== false ? undefined : tokens.colors.text.static_icons__secondary.rgba
      }
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
  bottom: 100px;
  width: 100%;
`;

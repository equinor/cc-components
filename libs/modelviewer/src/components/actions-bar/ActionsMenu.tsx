import { Button, Icon } from '@equinor/eds-core-react';
import { crop, fullscreen, rotate_3d, visibility } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useSelectionContext } from '../../providers/selectionProvider';
import { ColorPaletteMenu } from '../action-color-palette-menu/action-color-palette-menu';
import { ModelSettingsMenu } from '../action-model-settings-menu/action-model-settings-menu';

export const ActionsMenu = () => {
  Icon.add({ crop, visibility, fullscreen, rotate_3d });

  const {
    isClipped,
    isOrbit,
    isFocus,
    toggleFocus,
    toggleClipping,
    fitToScreen,
    toggleCameraMode,
  } = useSelectionContext();

  return (
    <>
      <WrapperActionsBar>
        <ActionsBar>
          <Button
            variant="ghost_icon"
            title="Crop Selection"
            onClick={() => {
              toggleClipping();
            }}
          >
            <Icon
              name={'crop'}
              color={
                isClipped ? tokens.colors.text.static_icons__secondary.rgba : undefined
              }
            />
          </Button>
          <Button
            variant="ghost_icon"
            title="Show selection only"
            onClick={() => {
              toggleFocus();
            }}
          >
            <Icon
              name={'visibility'}
              color={
                isFocus ? tokens.colors.text.static_icons__secondary.rgba : undefined
              }
            />
          </Button>

          <ColorPaletteMenu />

          <Button
            title="Fit to screen"
            variant="ghost_icon"
            onClick={() => {
              fitToScreen();
            }}
          >
            <Icon
              name={'fullscreen'}
              color={tokens.colors.text.static_icons__secondary.rgba}
            />
          </Button>
          <Button
            title="Free Camera / Orbit"
            variant="ghost_icon"
            onClick={() => {
              toggleCameraMode();
            }}
          >
            <Icon
              name={'rotate_3d'}
              color={
                !isOrbit ? tokens.colors.text.static_icons__secondary.rgba : undefined
              }
            />
          </Button>
          <ModelSettingsMenu />
        </ActionsBar>
      </WrapperActionsBar>
    </>
  );
};

export const ActionsBar = styled.div`
  display: flex;
  bottom: 50px;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 50px;
  > button {
    margin: 0rem 0.25rem;
  }
`;

export const WrapperActionsBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 50px;
  width: 100%;
`;

import { Button, Icon, Menu } from '@equinor/eds-core-react';
import {
  color_palette,
  crop,
  fullscreen,
  more_horizontal,
  visibility,
  rotate_3d,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';
import { useModelContext } from '../../providers/modelsProvider';
import { useSelectionContext } from '../../providers/selectionProvider';

export const ActionsMenu = () => {
  Icon.add({ crop, visibility, color_palette, fullscreen, more_horizontal, rotate_3d });

  const { showSelector, setShowModelDialog } = useModelContext();
  const {
    toggleClipping,
    isClipped,
    fitToScreen,
    toggleShowNodesNotInSelection,
    orbit,
    firstPerson,
  } = useSelectionContext();

  const [isOrbit, setIsOrbit] = useState(false);

  const [colorPaletteIsOpen, setColorPaletteIsOpen] = useState<boolean>(false);
  const [colorPaletteAnchorEl, setColorPaletteAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [selectedColorPaletteIndex, setSelectedColorPaletteIndex] = useState(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const colorPaletteOptions = ['Color Option 1', 'Color Option 2', 'Color Option 3'];

  const showModelSelector = () => {
    setShowModelDialog(!showSelector);
  };

  const optionsSettings = ['Change Model', 'Model Action 2', 'Model Action 3'];

  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setSelectedIndex(index);

    if (optionsSettings[index] === 'Change Model') {
      showModelSelector();
    }
  };
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleCameraMode = () => {
    if (isOrbit) {
      firstPerson();
    } else {
      orbit();
    }
    setIsOrbit(!isOrbit);
  };

  const handleColorPaletteMenuItemClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setSelectedColorPaletteIndex(index);
    // if (colorPaletteOptions[index] === 'Color Option 1') {}
  };

  const openColorPaletteMenu = () => {
    setColorPaletteIsOpen(true);
  };

  const closeColorPaletteMenu = () => {
    setColorPaletteIsOpen(false);
  };

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
              console.log();
              toggleShowNodesNotInSelection();
            }}
          >
            <Icon
              name={'visibility'}
              color={true ? tokens.colors.text.static_icons__secondary.rgba : undefined}
            />
          </Button>

          <Button
            variant="ghost_icon"
            title="Change color palette"
            onClick={() => {
              openColorPaletteMenu();
            }}
            ref={setColorPaletteAnchorEl}
          >
            <Icon
              name={'color_palette'}
              color={false ? undefined : tokens.colors.text.static_icons__secondary.rgba}
            />
          </Button>
          <Menu
            open={colorPaletteIsOpen}
            id="menu-color-palette"
            aria-labelledby="anchor-color-palette"
            onClose={closeColorPaletteMenu}
            anchorEl={colorPaletteAnchorEl}
          >
            {colorPaletteOptions.map((option, index) => (
              <Menu.Item
                key={option}
                // Placeholder: disabling the third option just as an example
                disabled={index === 2}
                onClick={(event: React.MouseEvent) =>
                  handleColorPaletteMenuItemClick(event, index)
                }
              >
                {option}
              </Menu.Item>
            ))}
          </Menu>

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
          <Button
            ref={setAnchorEl}
            variant="ghost_icon"
            aria-label="select task action"
            aria-haspopup="true"
            aria-controls="menu-default"
            id="anchor-split"
            onClick={() => (isOpen ? closeMenu() : openMenu())}
          >
            <Icon data={more_horizontal} title="arrow_down"></Icon>
          </Button>
          <Menu
            open={isOpen}
            id="menu-split"
            aria-labelledby="anchor-split"
            onClose={closeMenu}
            anchorEl={anchorEl}
          >
            {optionsSettings.map((option, index) => (
              <Menu.Item
                key={option}
                disabled={index === 2}
                onClick={(event: React.MouseEvent) => handleMenuItemClick(event, index)}
              >
                {option}
              </Menu.Item>
            ))}
          </Menu>
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
  /* z-index: 10; */
`;

import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { color_palette } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useActions } from '../../providers/actionProvider';

export const ColorPaletteMenu = () => {
  Icon.add({ color_palette });
  const {
    assignGrayscaleToInvertedNodeCollection,
    assignDefaultColorToInvertedNodeCollection,
    assignOutlineToInvertedNodeCollection,
  } = useActions();

  const [colorPaletteIsOpen, setColorPaletteIsOpen] = useState<boolean>(false);
  const [colorPaletteAnchorEl, setColorPaletteAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const colorPaletteOptions = ['Grayscale', 'Default', 'Outline'];

  const handleColorPaletteMenuItemClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();

    if (colorPaletteOptions[index] === 'Grayscale') {
      assignGrayscaleToInvertedNodeCollection();
    }
    if (colorPaletteOptions[index] === 'Default') {
      assignDefaultColorToInvertedNodeCollection();
    }
    if (colorPaletteOptions[index] === 'Outline') {
      assignOutlineToInvertedNodeCollection();
    }
  };

  const openColorPaletteMenu = () => {
    setColorPaletteIsOpen(true);
  };

  const closeColorPaletteMenu = () => {
    setColorPaletteIsOpen(false);
  };

  return (
    <>
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
          color={tokens.colors.text.static_icons__secondary.rgba}
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
            onClick={(event: React.MouseEvent) =>
              handleColorPaletteMenuItemClick(event, index)
            }
          >
            {option}
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

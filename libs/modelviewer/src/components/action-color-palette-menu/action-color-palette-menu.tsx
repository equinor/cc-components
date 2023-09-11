import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { color_palette } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useActions } from '../../providers/actionProvider';
import { NodeAppearance, NodeOutlineColor } from '@cognite/reveal';
import { Color } from 'three';

export const ColorPaletteMenu = () => {
  Icon.add({ color_palette });
  const { assignAppearanceToInvertedNodeCollection } = useActions();

  const [colorPaletteIsOpen, setColorPaletteIsOpen] = useState<boolean>(false);
  const [colorPaletteAnchorEl, setColorPaletteAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const colorPaletteOptions = ['Default', 'Grayscale', 'Ghost'];

  const handleColorPaletteMenuItemClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    let appearance: NodeAppearance = {};
    if (colorPaletteOptions[index] === 'Grayscale') {
      appearance = {
        color: new Color(128, 128, 128),
        outlineColor: NodeOutlineColor.NoOutline,
        renderGhosted: false,
      };
    }
    if (colorPaletteOptions[index] === 'Default') {
      appearance = {
        color: new Color(0, 0, 0),
        outlineColor: NodeOutlineColor.NoOutline,
        renderGhosted: false,
      };
    }
    if (colorPaletteOptions[index] === 'Ghost') {
      appearance = {
        renderGhosted: true,
      };
    }
    assignAppearanceToInvertedNodeCollection(appearance);
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

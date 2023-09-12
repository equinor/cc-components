import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { color_palette } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useActions } from '../../providers/actionProvider';
import { NodeAppearance, NodeOutlineColor } from '@cognite/reveal';
import { Color } from 'three';

export const ColorPaletteMenu = () => {
  type ColorOption = 'Default' | 'Grayscale' | 'Ghost';
  Icon.add({ color_palette });

  const { assignAppearanceToInvertedNodeCollection } = useActions();

  const [colorPaletteIsOpen, setColorPaletteIsOpen] = useState<boolean>(false);
  const [colorPaletteAnchorEl, setColorPaletteAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const colorPaletteOptions: ColorOption[] = ['Default', 'Grayscale', 'Ghost'];

  const getAppearanceByOption = (option: ColorOption): NodeAppearance => {
    const appearances: Record<ColorOption, NodeAppearance> = {
      Default: {
        color: new Color(0, 0, 0),
        outlineColor: NodeOutlineColor.NoOutline,
        renderGhosted: false,
      },
      Grayscale: {
        color: new Color(128, 128, 128),
        outlineColor: NodeOutlineColor.NoOutline,
        renderGhosted: false,
      },
      Ghost: {
        renderGhosted: true,
      },
    };
    return appearances[option];
  };

  const handleColorPaletteMenuItemClick = (
    event: React.MouseEvent,
    option: ColorOption
  ) => {
    event.stopPropagation();
    const appearance = getAppearanceByOption(option);
    assignAppearanceToInvertedNodeCollection(appearance);
  };

  return (
    <>
      <Button
        variant="ghost_icon"
        title="Change color palette"
        onClick={() => setColorPaletteIsOpen(true)}
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
        onClose={() => setColorPaletteIsOpen(false)}
        anchorEl={colorPaletteAnchorEl}
      >
        {colorPaletteOptions.map((option) => (
          <Menu.Item
            key={option}
            onClick={(event: React.MouseEvent) =>
              handleColorPaletteMenuItemClick(event, option)
            }
          >
            {option}
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

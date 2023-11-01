import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { color_palette } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useActions } from '../../providers/actionProvider';
import { ColorOption, getAppearanceByOption } from '../../utils/colorOptions';
Icon.add({ color_palette });
export const ColorPaletteMenu = () => {
  const { assignAppearanceToInvertedNodeCollection } = useActions();

  const [colorPaletteIsOpen, setColorPaletteIsOpen] = useState<boolean>(false);
  const [colorPaletteAnchorEl, setColorPaletteAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const colorPaletteOptions: ColorOption[] = ['Default', 'Grayscale', 'Ghost'];

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

import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { more_horizontal } from '@equinor/eds-icons';
import { useState } from 'react';
import { useModelContext } from '../../providers/modelsProvider';

export const ModelSettingsMenu = () => {
  Icon.add({ more_horizontal });

  const { showSelector, setShowModelDialog } = useModelContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <>
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
    </>
  );
};

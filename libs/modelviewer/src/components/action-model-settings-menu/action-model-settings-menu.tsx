import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { more_horizontal } from '@equinor/eds-icons';
import { useMemo, useState } from 'react';
import { useModelSelectionContext } from '../../providers/modelSelectionProvider';
import { usePlantSelectionContext } from '../../providers/plantSelectionProvider';

Icon.add({ more_horizontal });

export const ModelSettingsMenu = () => {
  const { isModelSelectionVisible, setShowModelDialog } = useModelSelectionContext();

  const { isPlantSelectionVisible, setShowPlantDialog, plants } =
    usePlantSelectionContext();

  const optionsSettings = useMemo(() => {
    return plants.length === 0
      ? ['Change 3d Model']
      : ['Change 3d Model', 'Change Plant'];
  }, [plants]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const showModelSelector = () => {
    setShowModelDialog(!isModelSelectionVisible);
  };

  const showPlantSelectior = () => {
    setShowPlantDialog(!isPlantSelectionVisible);
  };

  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    if (optionsSettings[index] === 'Change 3d Model') {
      showModelSelector();
    }
    if (optionsSettings[index] === 'Change Plant') {
      showPlantSelectior();
    }
  };

  return (
    <>
      <Button
        ref={setAnchorEl}
        variant="ghost_icon"
        aria-label="Open task actions menu"
        aria-haspopup="true"
        aria-controls="task-actions-menu"
        id="task-actions-button"
        onClick={toggleMenu}
      >
        <Icon data={more_horizontal} title="More options icon"></Icon>
      </Button>
      <Menu
        open={isOpen}
        id="task-actions-menu"
        aria-labelledby="task-actions-button"
        onClose={toggleMenu}
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

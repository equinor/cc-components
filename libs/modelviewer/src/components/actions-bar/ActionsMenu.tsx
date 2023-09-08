import { Button, Icon, Menu } from '@equinor/eds-core-react';
import {
  color_palette,
  crop,
  fullscreen,
  more_horizontal,
  visibility,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModelContext } from '../../providers/modelsProvider';
import { useSelectionContext } from '../../providers/selectionProvider';
import { useActions } from '../../providers/actionProvider';

export const ActionsMenu = () => {
  Icon.add({ crop, visibility, color_palette, fullscreen, more_horizontal });

  const { showSelector, setShowModelDialog } = useModelContext();
  const { toggleClipping, isClipped, fitToScreen, toggleShowNodesNotInSelection } =
    useSelectionContext();

  const showModelSelector = () => {
    setShowModelDialog(!showSelector);
  };

  const options = ['Change Model', 'Model Action 2', 'Model Action 3'];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { showModel, hideModel } = useActions();

  useEffect(() => {
    isVisible ? showModel() : hideModel();
  }, [isVisible, showModel, hideModel]);

  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setSelectedIndex(index);

    if (options[index] === 'Change Model') {
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
      <WrapperActionsBar>
        <ActionsBar>
          <Button
            variant="ghost_icon"
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
            onClick={() => {
              console.log();
              setIsVisible((s) => !s);
            }}
          >
            <Icon
              name={'visibility'}
              color={true ? tokens.colors.text.static_icons__secondary.rgba : undefined}
            />
          </Button>

          <Button
            variant="ghost_icon"
            onClick={() => {
              toggleShowNodesNotInSelection();
            }}
          >
            <Icon
              name={'color_palette'}
              color={false ? undefined : tokens.colors.text.static_icons__secondary.rgba}
            />
          </Button>
          <Button
            title="View selection"
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
            {options.map((option, index) => (
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

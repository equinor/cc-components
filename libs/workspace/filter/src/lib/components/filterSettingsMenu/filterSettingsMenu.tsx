import { Button, EdsProvider, Menu, Switch, Typography, Dialog } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useFilterContext } from 'lib/context/filterContext';
import React, { useEffect, useRef, useState } from 'react';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import styled from 'styled-components';
import { DragHandleIcon, StarIcon, StarOutlinedIcon, TuneIcon, useSettings } from '@equinor/workspace-core';

interface FilterSettingsMenuProps {
  disabled?: boolean;
}

const StyledButton = styled(Button)`
  min-width: 40px;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  justify-content: center;
  margin: 4px 0;
  &:hover {
    border-radius: 4px;
  }
`;

const StyledMenuList = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`;

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 3px 6px;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
  user-select: none;

  & input[type='checkbox'] + span > span:last-child {
    color: ${tokens.colors.interactive.icon_on_interactive_colors.hex};
  }
`;

const StyledDialog = styled(Dialog)`
  width: 400px;
  max-width: 90vw;

  .EdsDialog-paper {
    width: 400px;
    max-width: 90vw;
  }
`;

const StyledDialogActions = styled(Dialog.Actions)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const FilterSettingsMenu: React.FC<FilterSettingsMenuProps> = ({ disabled }) => {
  const { filterValues, reorderFilterGroups, updateQuickFilters, setIncludeCount, includeCount, clearSettings } =
    useFilterContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);

  const { colorAssistMode, setColorAssistMode } = useSettings();

  const mappedList = filterValues.map((group) => ({ ...group, id: group.name, name: group.name }));

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const handleButtonClick = () => {
    isOpen ? closeMenu() : openMenu();
  };

  const openConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleClearSettings = () => {
    clearSettings();
    closeConfirmDialog();
    closeMenu();
  };

  const updateListOrder = (newState: { id: string; name: string }[]) => {
    reorderFilterGroups(newState.map((item) => item.name));
  };

  return (
    <>
      <StyledButton variant="ghost_icon" ref={setAnchorEl} onClick={handleButtonClick} disabled={disabled}>
        <TuneIcon />
      </StyledButton>
      <Menu open={isOpen} id="menu-default" aria-labelledby="anchor-default" onClose={closeMenu} anchorEl={anchorEl}>
        <EdsProvider density={'compact'}>
          <Menu.Section title="Settings">
            <StyledMenuList>
              <StyledMenuItem>
                <Switch
                  label="Include item count"
                  checked={includeCount}
                  onChange={(e) => setIncludeCount(e.target.checked)}
                  size="small"
                  style={{ width: '100%' }}
                />
              </StyledMenuItem>
              <StyledMenuItem>
                <Switch
                  label="Color assist mode"
                  checked={colorAssistMode}
                  onChange={(e) => setColorAssistMode(e.target.checked)}
                  size="small"
                  style={{ width: '100%' }}
                />
              </StyledMenuItem>
              <StyledMenuItem>
                <FullWidthButton variant="ghost_icon" onClick={openConfirmDialog}>
                  Reset Settings
                </FullWidthButton>
              </StyledMenuItem>
            </StyledMenuList>
          </Menu.Section>
          <Menu.Section title="Filter Order">
            <StyledMenuList>
              <ReactSortable animation={200} list={mappedList} setList={(newState) => updateListOrder(newState)}>
                {mappedList.map(({ id, name, isQuickFilter }) => (
                  <StyledMenuItem key={id} style={{ cursor: 'grab' }}>
                    <Button variant="ghost_icon" onClick={() => updateQuickFilters(name, !isQuickFilter)}>
                      {isQuickFilter ? <StarIcon /> : <StarOutlinedIcon />}
                    </Button>
                    <Typography group="navigation" variant="menu_title" as="span">
                      {name}
                    </Typography>
                    <DragHandleIcon
                      style={{ marginLeft: 'auto' }}
                      color={tokens.colors.text.static_icons__default.hex}
                    />
                  </StyledMenuItem>
                ))}
              </ReactSortable>
            </StyledMenuList>
          </Menu.Section>
        </EdsProvider>
      </Menu>

      <StyledDialog open={isConfirmDialogOpen} onClose={closeConfirmDialog}>
        <Dialog.Header>
          <Dialog.Title>Reset Workspace Settings</Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <Typography variant="body_short">Are you sure you want to reset all workspace settings?</Typography>
        </Dialog.Content>
        <StyledDialogActions>
          <Button variant="outlined" onClick={closeConfirmDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="danger" onClick={handleClearSettings}>
            Reset Settings
          </Button>
        </StyledDialogActions>
      </StyledDialog>
    </>
  );
};

export default FilterSettingsMenu;

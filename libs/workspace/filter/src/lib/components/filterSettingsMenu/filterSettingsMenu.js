import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, EdsProvider, Menu, Switch, Typography, Dialog } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useFilterContext } from 'lib/context/filterContext';
import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { DragHandleIcon, StarIcon, StarOutlinedIcon, TuneIcon, useSettings } from '@equinor/workspace-core';
const StyledButton = styled(Button) `
  min-width: 40px;
`;
const FullWidthButton = styled(Button) `
  width: 100%;
  justify-content: center;
  margin: 4px 0;
  &:hover {
    border-radius: 4px;
  }
`;
const StyledMenuList = styled.div `
  max-height: 60vh;
  overflow-y: auto;
`;
const StyledMenuItem = styled.div `
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
const StyledDialog = styled(Dialog) `
  width: 400px;
  max-width: 90vw;

  .EdsDialog-paper {
    width: 400px;
    max-width: 90vw;
  }
`;
const StyledDialogActions = styled(Dialog.Actions) `
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;
const FilterSettingsMenu = ({ disabled }) => {
    const { filterValues, reorderFilterGroups, updateQuickFilters, setIncludeCount, includeCount, clearSettings } = useFilterContext();
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
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
    const updateListOrder = (newState) => {
        reorderFilterGroups(newState.map((item) => item.name));
    };
    return (_jsxs(_Fragment, { children: [_jsx(StyledButton, { variant: "ghost_icon", ref: setAnchorEl, onClick: handleButtonClick, disabled: disabled, children: _jsx(TuneIcon, {}) }), _jsx(Menu, { open: isOpen, id: "menu-default", "aria-labelledby": "anchor-default", onClose: closeMenu, anchorEl: anchorEl, children: _jsxs(EdsProvider, { density: 'compact', children: [_jsx(Menu.Section, { title: "Settings", children: _jsxs(StyledMenuList, { children: [_jsx(StyledMenuItem, { children: _jsx(Switch, { label: "Include item count", checked: includeCount, onChange: (e) => setIncludeCount(e.target.checked), size: "small", style: { width: '100%' } }) }), _jsx(StyledMenuItem, { children: _jsx(Switch, { label: "Color assist mode", checked: colorAssistMode, onChange: (e) => setColorAssistMode(e.target.checked), size: "small", style: { width: '100%' } }) }), _jsx(StyledMenuItem, { children: _jsx(FullWidthButton, { variant: "ghost_icon", onClick: openConfirmDialog, children: "Reset Settings" }) })] }) }), _jsx(Menu.Section, { title: "Filter Order", children: _jsx(StyledMenuList, { children: _jsx(ReactSortable, { animation: 200, list: mappedList, setList: (newState) => updateListOrder(newState), children: mappedList.map(({ id, name, isQuickFilter }) => (_jsxs(StyledMenuItem, { style: { cursor: 'grab' }, children: [_jsx(Button, { variant: "ghost_icon", onClick: () => updateQuickFilters(name, !isQuickFilter), children: isQuickFilter ? _jsx(StarIcon, {}) : _jsx(StarOutlinedIcon, {}) }), _jsx(Typography, { group: "navigation", variant: "menu_title", as: "span", children: name }), _jsx(DragHandleIcon, { style: { marginLeft: 'auto' }, color: tokens.colors.text.static_icons__default.hex })] }, id))) }) }) })] }) }), _jsxs(StyledDialog, { open: isConfirmDialogOpen, onClose: closeConfirmDialog, children: [_jsx(Dialog.Header, { children: _jsx(Dialog.Title, { children: "Reset Workspace Settings" }) }), _jsx(Dialog.Content, { children: _jsx(Typography, { variant: "body_short", children: "Are you sure you want to reset all workspace settings?" }) }), _jsxs(StyledDialogActions, { children: [_jsx(Button, { variant: "outlined", onClick: closeConfirmDialog, children: "Cancel" }), _jsx(Button, { variant: "contained", color: "danger", onClick: handleClearSettings, children: "Reset Settings" })] })] })] }));
};
export default FilterSettingsMenu;

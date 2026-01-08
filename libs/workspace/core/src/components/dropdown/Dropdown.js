import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { EdsProvider, Icon, Typography } from '@equinor/eds-core-react';
import { DropdownContainer } from './Dropdown.styles';
import { DropdownPopover } from './DropdownPopover';
export const Dropdown = ({ children, listItems, valueSelected, valueGetter, tooltipGetter, customRenderer, clearAll, }) => {
    const [open, setOpen] = useState(false);
    const anchorEl = useRef(null);
    const selectedCount = listItems.filter((item) => item.selected).length;
    const handleValueSelected = (value, selected) => {
        valueSelected(value);
    };
    return (_jsxs(EdsProvider, { density: "compact", children: [_jsxs(DropdownContainer, { onClick: () => setOpen(!open), ref: anchorEl, selected: selectedCount > 0, children: [children, selectedCount > 0 && _jsx(Typography, { variant: "caption", children: ` (+${selectedCount})` }), _jsx(Icon, { name: open ? 'chevron_up' : 'chevron_down' })] }), open && (_jsx(DropdownPopover, { open: true, anchorEl: anchorEl.current, listItems: listItems, valueSelected: handleValueSelected, valueGetter: valueGetter, clickedOutside: () => setOpen(false), clearAll: () => {
                    clearAll?.();
                }, buttonElement: anchorEl, tooltipGetter: tooltipGetter, customRenderer: customRenderer }))] }));
};

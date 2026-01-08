import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ActionsContainer, DropdownListItem, DropdownMenu, ListItemText, SearchbarContainer, VirtualListContainer, VirtualListItemContainer, } from './Dropdown.styles';
export const DropdownPopover = ({ anchorEl, open, listItems, valueSelected, valueGetter, tooltipGetter, clearAll, clickedOutside, buttonElement, customRenderer, }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState(listItems);
    const ref = useRef(null);
    const menuElRef = useRef(null);
    const searchbarRef = useRef(null);
    const rowVirtualizer = useVirtualizer({
        count: filteredItems.length,
        getScrollElement: () => ref.current,
        estimateSize: () => 30,
    });
    function handleInput(event) {
        setSearchText(event.currentTarget.value);
    }
    useEffect(() => {
        const filtered = listItems.filter((item) => {
            return valueGetter(item).toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredItems(filtered);
    }, [searchText, listItems]);
    return (_jsxs(_Fragment, { children: [open &&
                createPortal(_jsx("div", { style: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 999,
                    }, onClick: () => {
                        clickedOutside();
                        setSearchText('');
                    } }), document.body), _jsx(DropdownMenu, { open: open, anchorEl: anchorEl, placement: "bottom-end", children: _jsxs("div", { ref: menuElRef, children: [_jsx(SearchbarContainer, { children: _jsx("input", { value: searchText, placeholder: "Search", onInput: handleInput, autoFocus: open, ref: searchbarRef }) }), _jsx(VirtualListContainer, { ref: ref, children: _jsx(VirtualListItemContainer, { height: rowVirtualizer.getTotalSize(), children: rowVirtualizer.getVirtualItems()?.map(({ index, key, size, start }) => {
                                    const item = filteredItems[index];
                                    if (item.selected === undefined) {
                                        item.selected = false;
                                    }
                                    const value = valueGetter(item);
                                    return (_jsx(Tooltip, { title: tooltipGetter ? tooltipGetter(item) : value, enterDelay: 500, children: _jsxs(DropdownListItem, { onClick: (e) => {
                                                e.stopPropagation();
                                                valueSelected(item, !item.selected);
                                            }, height: size, start: start, children: [_jsx(Checkbox, { checked: item.selected, readOnly: true }), customRenderer ? customRenderer(item) : _jsx(ListItemText, { children: value })] }, key) }, key));
                                }) }) }), clearAll && (_jsx(ActionsContainer, { children: _jsx(Button, { onClick: clearAll, variant: "ghost", children: "Clear" }) }))] }) })] }));
};

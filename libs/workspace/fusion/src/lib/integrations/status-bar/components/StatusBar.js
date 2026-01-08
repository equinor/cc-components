import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { StatusBarItem } from './StatusBarItem';
import { StyledStatusBar, StyledStatusBarDivider } from './statusBar.styles';
export function StatusBar({ items }) {
    if (!items.length)
        return null;
    // Check if all items are in the same group
    if (items.every((i) => i.group === items[0].group)) {
        return (_jsx(StyledStatusBar, { id: "status_bar_root", children: items.map((item) => (_jsx(StatusBarItem, { item: item }, item.title))) }));
    }
    // Group items by their 'group' property
    const groupedItems = items.reduce((groups, item) => {
        const group = groups[item.group ?? ''] || [];
        group.push(item);
        groups[item.group ?? ''] = group;
        return groups;
    }, {});
    // Render each group with its items
    return (_jsx(StyledStatusBar, { id: "status_bar_root", children: Object.entries(groupedItems).map(([groupName, groupItems], i) => (_jsxs(_Fragment, { children: [i !== 0 && (_jsxs(_Fragment, { children: [_jsx(StyledStatusBarDivider, {}), _jsx(StatusBarItem, { groupName: groupName })] })), groupItems.map((item) => (_jsx(StatusBarItem, { item: item }, item.title)))] }))) }));
}

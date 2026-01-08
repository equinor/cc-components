import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Icon } from '@equinor/eds-core-react';
import { expand, collapse } from '@equinor/eds-icons';
import { useState } from 'react';
import { GroupingSelector } from '../GroupingSelector/GroupingSelector';
import { StyledViewSettings } from './viewSettings.styles';
const LOCAL_STORAGE_KEY = 'WorkspaceSidebarToggleState';
Icon.add({ expand, collapse });
export function ViewSettings({ groupingKeys, timeInterval, dateVariant, onChangeTimeInterval, onChangeDateVariant, setGroupingKeys, }) {
    const [toggle, setToggle] = useState(() => {
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedState !== null ? !!JSON.parse(savedState) : true;
    });
    const onChangeToggle = (state) => {
        setToggle(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    };
    return (_jsx(StyledViewSettings, { expanded: toggle, children: toggle ? (_jsxs(_Fragment, { children: [_jsxs("div", { style: { display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsx(Button, { variant: "ghost_icon", onClick: () => onChangeToggle(!toggle), children: _jsx(Icon, { data: expand }) }), _jsx("p", { style: { marginRight: '10px', fontSize: '16px', fontWeight: '500' }, children: "View Settings" })] }), _jsx(GroupingSelector, { groupingKeys: groupingKeys, setGroupingKeys: setGroupingKeys, timeInterval: timeInterval, onChangeTimeInterval: onChangeTimeInterval, dateVariant: dateVariant, onChangeDateVarient: onChangeDateVariant })] })) : (_jsx(_Fragment, { children: _jsx(Button, { variant: "ghost_icon", onClick: () => onChangeToggle(!toggle), style: { paddingLeft: '0' }, children: _jsx(Icon, { data: collapse }) }) })) }));
}

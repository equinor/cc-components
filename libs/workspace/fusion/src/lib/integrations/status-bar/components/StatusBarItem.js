import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StatusCard, Title, ValueWrapper, Value, Group } from './statusBarItem.styles';
export function StatusBarItem({ item, groupName }) {
    const formattedValue = formatValue(item?.value ?? '');
    return (_jsxs(StatusCard, { title: item?.description, children: [_jsx(Title, { children: item?.title }), _jsx(ValueWrapper, { children: groupName ? _jsx(Group, { children: groupName }) : _jsx(Value, { children: formattedValue }) })] }, item?.title));
}
const formatValue = (value) => {
    if (typeof value === 'number') {
        if (value === 0) {
            return '-';
        }
        return value.toLocaleString('no');
    }
    return value;
};

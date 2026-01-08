import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useReducer } from 'react';
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["EXPAND_COLUMN"] = 0] = "EXPAND_COLUMN";
})(ActionType || (ActionType = {}));
const expandReducer = (defaultColumnWidth) => (state, action) => {
    switch (action.type) {
        case ActionType.EXPAND_COLUMN: {
            if (state.expandedColumns.findIndex((s) => s === action.index) !== -1) {
                const newWidths = [...state.widths];
                newWidths[action.index] = defaultColumnWidth;
                return {
                    expandedColumns: state.expandedColumns.filter((s) => s !== action.index),
                    widths: newWidths,
                };
            }
            else {
                const newWidths = [...state.widths];
                newWidths[action.index] = defaultColumnWidth + 500;
                return {
                    expandedColumns: [...state.expandedColumns, action.index],
                    widths: newWidths,
                };
            }
        }
        default:
            return { expandedColumns: [], widths: [] };
    }
};
const ExpandContext = createContext({
    expandedColumns: [],
    widths: [],
});
function createExpandDispatchContext() {
    return createContext(undefined);
}
const ExpandDispatchContext = createExpandDispatchContext();
const ExpandProvider = (props) => {
    const { initialWidths, defaultColumnWidth, children } = props;
    const [state, dispatch] = useReducer(expandReducer(defaultColumnWidth), {
        expandedColumns: [],
        widths: initialWidths,
    });
    return (_jsx(ExpandContext.Provider, { value: state, children: _jsx(ExpandDispatchContext.Provider, { value: dispatch, children: children }) }));
};
export { ExpandProvider, ExpandContext, ExpandDispatchContext };

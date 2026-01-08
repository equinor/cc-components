import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
const GLOBAL_STORAGE_PREFIX = 'cc_workspace';
const COLOR_ASSIST_MODE_KEY = `${GLOBAL_STORAGE_PREFIX}_colorAssistMode`;
const getPersistedColorAssistMode = () => {
    const storedValue = localStorage.getItem(COLOR_ASSIST_MODE_KEY);
    return storedValue ? JSON.parse(storedValue) : false;
};
const saveColorAssistModeToLocalStorage = (enabled) => {
    localStorage.setItem(COLOR_ASSIST_MODE_KEY, JSON.stringify(enabled));
};
const SettingsContext = createContext(undefined);
export const SettingsProvider = ({ children }) => {
    const [colorAssistMode, setColorAssistModeState] = useState(getPersistedColorAssistMode());
    const setColorAssistMode = useCallback((enabled) => {
        setColorAssistModeState(enabled);
        saveColorAssistModeToLocalStorage(enabled);
    }, []);
    const clearSettings = useCallback(() => {
        localStorage.removeItem(COLOR_ASSIST_MODE_KEY);
        setColorAssistModeState(false);
    }, []);
    return (_jsx(SettingsContext.Provider, { value: { colorAssistMode, setColorAssistMode, clearSettings }, children: children }));
};
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

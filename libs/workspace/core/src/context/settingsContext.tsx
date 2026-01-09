import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

interface SettingsContextType {
  colorAssistMode: boolean;
  setColorAssistMode: (enabled: boolean) => void;
  clearSettings: () => void;
}

interface SettingsState {
  colorAssistMode: boolean;
}

const GLOBAL_STORAGE_PREFIX = 'cc_workspace';
const COLOR_ASSIST_MODE_KEY = `${GLOBAL_STORAGE_PREFIX}_colorAssistMode`;

const getPersistedColorAssistMode = (): boolean => {
  const storedValue = localStorage.getItem(COLOR_ASSIST_MODE_KEY);
  return storedValue ? JSON.parse(storedValue) : false;
};

const saveColorAssistModeToLocalStorage = (enabled: boolean): void => {
  localStorage.setItem(COLOR_ASSIST_MODE_KEY, JSON.stringify(enabled));
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [colorAssistMode, setColorAssistModeState] = useState<boolean>(getPersistedColorAssistMode());

  const setColorAssistMode = useCallback((enabled: boolean) => {
    setColorAssistModeState(enabled);
    saveColorAssistModeToLocalStorage(enabled);
  }, []);

  const clearSettings = useCallback(() => {
    localStorage.removeItem(COLOR_ASSIST_MODE_KEY);
    setColorAssistModeState(false);
  }, []);

  return (
    <SettingsContext.Provider value={{ colorAssistMode, setColorAssistMode, clearSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

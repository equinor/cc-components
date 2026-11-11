import { createContext, useContext, ReactNode, useCallback } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';

interface SettingsContextType {
  colorAssistMode: boolean;
  setColorAssistMode: (enabled: boolean) => void;
  clearSettings: () => void;
}

const COLOR_ASSIST_MODE_KEY = 'workspace.settings.colorAssistMode';
const LEGACY_COLOR_ASSIST_MODE_KEY = 'cc_workspace_colorAssistMode';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { value, setValue } = usePersistedState<boolean>(COLOR_ASSIST_MODE_KEY, {
    legacyKey: LEGACY_COLOR_ASSIST_MODE_KEY,
  });
  const colorAssistMode = value ?? false;

  const setColorAssistMode = useCallback((enabled: boolean) => setValue(enabled), [setValue]);

  const clearSettings = useCallback(() => setValue(undefined), [setValue]);

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

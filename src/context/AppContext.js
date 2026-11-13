import React, { createContext, useContext, useMemo, useState } from 'react';
import { palettes } from '../theme/colors';

const AppContext = createContext(null);

// Global state: theme mode + user profile name. Any screen reading this re-renders on change.
export function AppProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [name, setName] = useState('Student');

  const value = useMemo(() => ({
    mode,
    isDark: mode === 'dark',
    colors: palettes[mode],
    toggleTheme: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    name,
    setName,
  }), [mode, name]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};

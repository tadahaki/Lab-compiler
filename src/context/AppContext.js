import React, { createContext, useContext, useMemo, useState } from 'react';
import { palettes } from '../theme/colors';

const AppContext = createContext(null);

// Global state: theme mode + user profile name. Any screen reading this re-renders on change.
export function AppProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [name, setName] = useState('Student');
  const [recentActivities, setRecentActivities] = useState([]);

  const logActivity = (message) => setRecentActivities((items) => [
    { id: `${Date.now()}-${Math.random()}`, message, createdAt: new Date().toISOString() },
    ...items,
  ].slice(0, 20));

  const value = useMemo(() => ({
    mode,
    isDark: mode === 'dark',
    colors: palettes[mode],
    toggleTheme: () => setMode((m) => {
      const nextMode = m === 'light' ? 'dark' : 'light';
      logActivity(`Switched to ${nextMode} theme`);
      return nextMode;
    }),
    name,
    setName,
    recentActivities,
    logActivity,
  }), [mode, name, recentActivities]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};

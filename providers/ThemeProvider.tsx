// src/shared-components/providers/ThemeProviders.tsx
import React, { createContext } from 'react';
import { View } from 'react-native';
import { themes } from '~/utils/color-theme';
import { useDarkMode } from '~/store/store';

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
}>({
  theme: 'light',
});
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Dark Mode
  const finalDarkMode = useDarkMode((state) => state.finalDarkMode);
  return (
    <ThemeContext.Provider value={{ theme: finalDarkMode }}>
      <View
        style={{ ...themes[finalDarkMode], backgroundColor: 'var(--color-red-400)' }}
        className="flex-1 bg-red-600">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

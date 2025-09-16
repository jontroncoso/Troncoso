import { ThemeProvider } from '~/providers/ThemeProvider';
import '../global.css';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useDarkMode } from '~/store/store';

export default function Layout() {
  const color = useColorScheme();
  const setSystemDarkMode = useDarkMode((state) => state.setSystemDarkMode);
  React.useEffect(() => {
    setSystemDarkMode(color || 'light');
    // Preload fonts, etc
  }, [color, setSystemDarkMode]);
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

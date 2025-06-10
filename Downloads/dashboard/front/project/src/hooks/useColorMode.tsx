'use client';

import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkThemeOptions } from '@/theme/darkTheme';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ColorMode>('light');

  // Effect for client-side theme initialization
  useEffect(() => {
    // Set mounted state to prevent hydration mismatch
    setMounted(true);
    
    // Get saved theme from localStorage
    const savedMode = localStorage.getItem('themeMode') as ColorMode;
    
    if (savedMode) {
      // Use saved preference
      setMode(savedMode);
      document.documentElement.setAttribute('data-theme', savedMode);
    } else {
      // Check for system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialMode = prefersDarkMode ? 'dark' : 'light';
      setMode(initialMode);
      document.documentElement.setAttribute('data-theme', initialMode);
      localStorage.setItem('themeMode', initialMode);
    }
    
    // Add listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('themeMode')) {
        const newMode = e.matches ? 'dark' : 'light';
        setMode(newMode);
        document.documentElement.setAttribute('data-theme', newMode);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          document.documentElement.setAttribute('data-theme', newMode);
          return newMode;
        });
      },
    }),
    [mode]
  );

  // Create theme with memoization to prevent unnecessary re-renders
  const theme = useMemo(
    () =>
      createTheme(
        mode === 'light'
          ? {
              palette: {
                mode: 'light',
                primary: {
                  main: '#2196f3',
                },
                background: {
                  default: '#F1F4F7',
                  paper: '#ffffff',
                },
              },
            }
          : darkThemeOptions
      ),
    [mode]
  );

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
}
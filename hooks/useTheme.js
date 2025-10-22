import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('system');
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const applyTheme = () => {
        const root = window.document.documentElement;
        
        if (theme === 'dark') {
          setIsDark(true);
          root.classList.add('dark');
        } else if (theme === 'light') {
          setIsDark(false);
          root.classList.remove('dark');
        } else {
          // System theme
          const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setIsDark(systemDark);
          if (systemDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      };

      applyTheme();

      // Listen for system theme changes
      if (theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => applyTheme();
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme]);

  // Save theme to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.log('Error saving theme:', error);
      }
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  }, []);

  const setThemeMode = useCallback((mode) => {
    if (['light', 'dark', 'system'].includes(mode)) {
      setTheme(mode);
    }
  }, []);

  return {
    theme,
    isDark,
    toggleTheme,
    setThemeMode,
  };
};
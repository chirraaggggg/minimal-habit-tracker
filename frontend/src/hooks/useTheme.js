import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ls-theme';

/**
 * useTheme — manages light/dark theme with localStorage persistence.
 * Applies data-theme="dark" on the <html> element.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      // Default to 'dark' — :root in tokens.css is dark
      return localStorage.getItem(STORAGE_KEY) || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    // Always SET the attribute — never remove it.
    // tokens.css uses [data-theme="light"] and [data-theme="dark"] selectors.
    // Removing the attribute means [data-theme="light"] never matches.
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable — ignore
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}

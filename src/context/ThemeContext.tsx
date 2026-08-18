import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'rose' | 'sandbox';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('senati-theme');
    if (saved === 'light' || saved === 'dark' || saved === 'rose' || saved === 'sandbox') {
      return saved as Theme;
    }
    return 'light';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('senati-theme', newTheme);
  };

  useEffect(() => {
    // Remove previous theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-rose', 'theme-sandbox');
    
    // Add current theme class (if not light, as light is default in base variables)
    if (theme !== 'light') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "nooriayat:theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  // helper to actually apply the theme to <html>
  const applyTheme = (t: Theme) => {
    const el = typeof document !== "undefined" ? document.documentElement : null;
    if (!el) return;
    if (t === "dark") el.classList.add("dark");
    else el.classList.remove("dark");
  };

  useEffect(() => {
    // init from localStorage (manual-only)
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initial = saved === "dark" ? "dark" : "light";
      setThemeState(initial);
      applyTheme(initial);
    } catch (e) {
      // fallback to light if any error
      setThemeState("light");
      applyTheme("light");
    }

    // sync across tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const newVal = (e.newValue as Theme | null) ?? "light";
        setThemeState(newVal === "dark" ? "dark" : "light");
        applyTheme(newVal === "dark" ? "dark" : "light");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = (t: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch (e) {
      /* ignore storage errors */
    }
    setThemeState(t);
    applyTheme(t);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

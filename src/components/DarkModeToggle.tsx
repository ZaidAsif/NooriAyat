// src/components/DarkModeToggle.tsx
import React from "react";
import { useTheme } from "../theme/ThemeProvider";

export const DarkModeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent ${className}`}
    >
      {/* Moon (dark) / Sun (light) */}
      {isDark ? (
        // Sun icon for switching to light
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 3.22l.61 1.83a1 1 0 00.95.69h1.92a1 1 0 01.59 1.81l-1.56 1.14a1 1 0 00-.36 1.09l.61 1.83a1 1 0 01-1.54 1.12L10 11.6l-1.22.64a1 1 0 01-1.54-1.12l.61-1.83a1 1 0 00-.36-1.09L6.93 6.55A1 1 0 017.52 4.74h1.92a1 1 0 00.95-.69L10 3.22z" />
        </svg>
      ) : (
        // Moon icon for switching to dark
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

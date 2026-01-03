/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        background: {
          light: "#F9FAF7", // paper-like
          dark: "#0F172A",  // deep charcoal
        },
        card: {
          light: "#FFFFFF",
          dark: "#111827",
        },

        // Text
        text: {
          primary: {
            light: "#1F2933",
            dark: "#E5E7EB",
          },
          secondary: {
            light: "#4B5563",
            dark: "#9CA3AF",
          },
        },

        // Accent (calm Islamic green)
        accent: {
          DEFAULT: "#3F7F6D",
          dark: "#4FAF9A",
        },

        border: {
          light: "#E5E7EB",
          dark: "#1F2937",
        },
      },

      fontFamily: {
        arabic: ["Amiri", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      lineHeight: {
        arabic: "2.2",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

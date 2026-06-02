/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // support class-based dark mode
  theme: {
    extend: {
      colors: {
        background: "#0F1117",
        card: "#171923",
        primary: "#5B8DEF",
        secondary: "#8A63FF",
        success: "#2ECC71",
        warning: "#F39C12",
        danger: "#E74C3C",
        textPrimary: "#FFFFFF",
        textSecondary: "#B5B9C5",
        // Perspectives
        progressive: "#5B8DEF", // subtle blue accent
        conservative: "#E74C3C", // subtle red accent
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}

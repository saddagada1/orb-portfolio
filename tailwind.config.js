/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        mono: ["IBMPlexMono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: "var(--bg-colour)",
        secondary: "var(--text-colour)",
      },
    },
  },
  plugins: [],
};

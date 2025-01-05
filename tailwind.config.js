/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: "#2A59FE",
          light: "#4C7CFF",
          dark: "#1A3ED9",
        },
        customBg: "#F9F9F9",
      },
    },
  },
  plugins: [],
};

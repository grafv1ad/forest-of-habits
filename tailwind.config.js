/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      main: "#d19e7b",
      green: "#172e26",
      black: "#050505",
      beige: {
        second: "#fee8d4",
        lightest: "#fef2e8",
        light: "#e1b698",
        dark: "#af7959",
      },
      gray: "#605954",
      disabled: "#b5b0ad",
    },
    extend: {
      content: {
        checkbox: 'url("/src/images/checkbox.svg")',
      },
    },
  },
  plugins: [],
};

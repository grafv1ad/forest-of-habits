/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      main: "#d19e7b",
      second: "#fee8d4",
      black: "#050505",
      gray: "#605954",
      background: "#172e26",
    },
    extend: {
      fontFamily: {
        main: ["Montserrat", "sans-serif"],
        stick: ["Stick", "serif"],
      },
      backgroundImage: {
        footer: "url('/src/images/bg.svg')",
      },
    },
  },
  plugins: [],
};

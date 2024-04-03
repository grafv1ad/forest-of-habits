/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      main: "#d19e7b",
      beige: {
        100: "#fef2e8",
        300: "#e1b698",
        600: "#fee8d4",
        900: "#af7959",
      },
      black: "#050505",
      gray: "#605954",
      red: "#d14f50",
      background: "#172e26",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        main: ["Montserrat", "sans-serif"],
        stick: ["Stick", "serif"],
      },
      backgroundImage: {
        footer: "url('/src/images/bg.svg')",
        checkbox: "url('/src/images/checkbox.svg')",
      },
      content: {
        cone: "url('/src/images/pine_cone.svg')",
        marker: "url('/src/images/marker-tree.svg')",
        user: "url('/src/images/user.svg')",
      },
    },
  },
  plugins: [],
};

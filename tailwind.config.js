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
      overlay: "rgba(5, 5, 5, .75)",
      modal: "#172e26",
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
        user: "url('/src/images/user.svg')",
        cross: "url('/src/images/cross.svg')",
      },
      content: {
        cone: "url('/src/images/pine_cone.svg')",
        marker: "url('/src/images/marker-tree.svg')",
      },
      backgroundSize: {
        "100%": "100%",
        "100%-auto": "100% auto",
        "auto-100%": "auto 100%",
      },
    },
  },
  plugins: [],
};

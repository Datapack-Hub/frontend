//const forms = require("@tailwindcss/forms");
/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        brand: ["Lexend", "sans-serif"],
        console: ["Roboto Mono"]
      },
      colors: {
        newWhite: "#F5E8D0",
        darkWhite: "#edd6ab",
        dphOrange: "#ea580c",
      },
    },
  },

  //plugins: [forms],
};

module.exports = config;

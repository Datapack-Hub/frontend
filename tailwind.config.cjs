//const forms = require("@tailwindcss/forms");
/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        brand: ["Lexend", "sans-serif"],
        console: ["Roboto Mono", "monospace"]
      },
      colors: {
        "new-white": "#F5E8D0",
        "dark-white": "#edd6ab",
        "dph-orange": "#ea580c",
      },
    },
  },

  //plugins: [forms],
};

module.exports = config;

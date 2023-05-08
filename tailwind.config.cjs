
/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        brand: ["Lexend", "sans-serif"],
        console: ["Space Mono", "monospace"]
      },
      colors: {
        "new-white": "#F5E8D0",
        "new-white": {
          100: "#fcf2de",
          200: "#F5E8D0",
          300: "#edd6ab",
          400: "#DEC699"
        },
        "dph-orange": "#ea580c",
      },
      scale: {
        '102': '1.02',
      }
    },
  },

  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;

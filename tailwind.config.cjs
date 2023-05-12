
/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        brand: ["Lexend", "sans-serif"],
        console: ["Space Mono", "monospace"]
      },
      colors: {
        'pearl-lusta': { // NEW NEW WHITE
          '50': '#fcf2de',
          '100': '#f9eacc',
          '200': '#f3d394',
          '300': '#edb85c',
          '400': '#e99f36',
          '500': '#e27f1e',
          '600': '#c75f18',
          '700': '#a64217',
          '800': '#873419',
          '900': '#6f2b18',
          '950': '#401508',
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

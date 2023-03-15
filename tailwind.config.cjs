/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        brand: ['Lexend', 'sans-serif']
      },
      colors: {
        newWhite: '#F5E8D0',
        darkWhite: '#edd6ab',
        dphOrange: '#ea580c'
      }
    },
  },

  plugins: [],
};

module.exports = config;

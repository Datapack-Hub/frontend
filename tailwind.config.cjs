/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        brand: ['Lexend', 'sans-serif']
      },
      colors: {
        newWhite: ['#F5E8D0']
      }
    },
  },

  plugins: [],
};

module.exports = config;

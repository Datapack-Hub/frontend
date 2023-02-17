/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        brand: ['Lexend', 'sans-serif']
      }
    },
  },

  plugins: [],
};

module.exports = config;

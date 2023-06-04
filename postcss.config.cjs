const autoprefixer = require("autoprefixer");
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

const config = {
  plugins: [
    tailwindcss(),
    cssnano({ preset: "advanced", plugins: [autoprefixer] })
  ],
};

module.exports = config;

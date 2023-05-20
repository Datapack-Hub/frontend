const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require('cssnano')

const config = {
  plugins: [
    tailwindcss(), //Some plugins, like tailwindcss/nesting, need to run before Tailwind, tailwindcss(),
    cssnano({ preset: "advanced", plugins: [autoprefixer] })
  ],
};

module.exports = config;

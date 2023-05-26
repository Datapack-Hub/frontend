const autoprefixer = require("autoprefixer");
const cssnano = require('cssnano')

const config = {
  plugins: [
    cssnano({ preset: "advanced", plugins: [autoprefixer] })
  ],
};

module.exports = config;

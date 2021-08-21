const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    "postcss-import",
    tailwindcss,
    // "postcss-preset-env",
    // process.env.NODE_ENV === "production" ? "postcss-css-variables" : false,
    require("postcss-nested"),
    require('postcss-mixins'),
    "autoprefixer",
  ],
};

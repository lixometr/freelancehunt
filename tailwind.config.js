const plugin = require("tailwindcss/plugin");
const pluginFlex = require("./tailwind-plugins/flex");
const pluginFonts = require("./tailwind-plugins/fonts");
const screens = require("./tailwind-plugins/screens");
module.exports = {
  purge: ["./src/**/*.hbs", "./src/css/**/*.css"],
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      yellow: {
        300: "#FBDD88",
        DEFAULT: "#F9C846",
        700: "#F8BD20",
      },
      orange: {
        300: "#FB9A89",
        DEFAULT: "#F85A3E",
        700: "#F73A18",
      },
      green: {
        300: "#5BD793",
        DEFAULT: "#2FBF71",
        700: "#27A05E",
      },
      blue: {
        200: "#E4E8F1",
        300: "#8B9BF9",
        DEFAULT: "#4C65F6",
        700: "#2745F4",
      },
      black: {
        300: "#AFB8D5",
        DEFAULT: "#232A42",
        700: "#151A28",
      },
      text: {
        DEFAULT: "#232A42",
        subdued: "#696E7E",
        disabled: "#ACAEB9",
      },
      bg: {
        800: "#232A42",
        600: "#F1F1F5",
        400: "#F4F6FC",
        200: "#FBFBFD",
      },
    },
    fontFamily: {
      main: ["Montserrat", "sans-serif"],
    },
    boxShadow: {
      main: "0px 10px 20px rgba(35, 42, 66, 0.07)",
    },
    screens,
    extend: {
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
      },
      fontSize: {
        "3xl": "2rem",
        "6xl": "3.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [pluginFlex, pluginFonts],
};

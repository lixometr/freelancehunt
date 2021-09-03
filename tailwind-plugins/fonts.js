const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addUtilities, theme }) => {
  const utilities = [
    {
      ".h1": {
        fontSize: theme("fontSize.2xl"),
        fontWeight: theme("fontWeight.bold"),
        lineHeight: theme("lineHeight.7"),
        "@screen md": {
          fontSize: theme("fontSize.6xl"),
          lineHeight: "3.8rem",
        },
      },
    },
    {
      ".h2": {
        fontSize: theme("fontSize.2xl"),
        fontWeight: theme("fontWeight.bold"),
        lineHeight: theme("lineHeight.7"),
        "@screen md": {
          fontSize: theme("fontSize.3xl"),
          lineHeight: theme("lineHeight.8"),
        },
      },
    },
    {
      ".h3": {
        fontSize: theme("fontSize.lg"),
        fontWeight: theme("fontWeight.bold"),
        lineHeight: theme("lineHeight.5"),
        "@screen md": {
          fontSize: theme("fontSize.2xl"),
          lineHeight: theme("lineHeight.8"),
        },
      },
    },
    {
      ".p1": {
        fontSize: theme("fontSize.base"),
        lineHeight: theme("lineHeight.5"),
        "@screen md": {
          fontSize: theme("fontSize.lg"),
          lineHeight: theme("lineHeight.6"),
        },
      },
    },
    {
      ".p2": {
        fontSize: theme("fontSize.sm"),
        lineHeight: theme("lineHeight.4"),

        "@screen md": {
          fontSize: theme("fontSize.base"),
          lineHeight: theme("lineHeight.5"),
        },
      },
    },
    {
      ".p3": {
        fontSize: theme("fontSize.xs"),
        lineHeight: theme("lineHeight.3"),

        "@screen md": {
          fontSize: theme("fontSize.sm"),
          lineHeight: theme("lineHeight.4"),
        },
      },
    },
    {
      ".p4": {
        fontSize: theme("fontSize.xs"),
        lineHeight: theme("lineHeight.3"),
        color: theme("colors.text.disabled"),
      },
    },
  ];
  addUtilities(utilities, {
    variants: ["responsive"],
  });
});

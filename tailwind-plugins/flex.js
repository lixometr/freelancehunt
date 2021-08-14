const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addUtilities, theme }) => {
  const utilities = [
    {
      ".flex-center": {
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      },
    },
    {
      ".flex-y-center": {
        display: "flex",
        "align-items": "center",
      },
    },
    {
      ".flex-x-center": {
        display: "flex",
        "justify-content": "center",
      },
    },
  ];
  addUtilities(utilities);
});

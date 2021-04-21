module.exports = {
  theme: {
    filter: {
      // defaults to {}
      none: "none",
      grayscale: "grayscale(1)",
      invert: "invert(1)",
      sepia: "sepia(1)",
    },
    backdropFilter: {
      // defaults to {}
      none: "none",
      blur: "blur(20px)",
    },
    extend: {
      colors: {
        contessa: {
          full: "#d76858",
          light: "#FEF4E5",
          half: "#F2B897",
          crescent: "#E2846B",
        },
        indigo: "#3A137D",
      },
      bg: {
        contessa: {
          full: "#d76858",
          light: "#FEF4E5",
          half: "#F2B897",
          crescent: "#E2846B",
        },
      },
    },
  },
  variants: {
    filter: ["responsive"], // defaults to ['responsive']
    backdropFilter: ["responsive"], // defaults to ['responsive']
  },
  plugins: [require("tailwindcss-filters")],
};

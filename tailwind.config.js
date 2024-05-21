/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    fontFamily: {
      "anton": [ "Anton", "sans-serif" ],
      "courier-prime": [ "Courier Prime", "serif" ],
      "ibm-plex-sans": [ "IBM Plex Sans", "sans-serif" ],
    },
    extend: {
      colors: {
        "background": "#E4E2DD",
        "paragraph": "#DB4A2B",
        "white-snow": "#DB4A2B"
      },
    },
  },
  plugins: [],
}
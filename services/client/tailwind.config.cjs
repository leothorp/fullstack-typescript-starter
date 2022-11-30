/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,html}",
    "../../packages/ui/src/**/*.{ts,tsx,html}",
  ],
  theme: {
    backgroundColor: "#242424",
    extend: {},
  },
  plugins: [],
};

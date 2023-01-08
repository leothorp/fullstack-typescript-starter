/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,html}",
    "../../packages/ui/src/**/*.{ts,tsx,html}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#242424",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

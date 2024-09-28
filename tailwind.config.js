/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/assets/**/*.{css,js}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: { 'fill': '-webkit-fill-available', },
      height: { 'fill': '-webkit-fill-available', },
      width: { '50': '50vw', },
      height: { '50': '50vh', },
    },
  },
  plugins: []
}
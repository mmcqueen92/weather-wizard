/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'lake-island': "url('/public/img/backgrounds/bg1.jpg')"
      }
    },
  },
  plugins: [],
}
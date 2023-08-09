/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'lake-island': "url('/public/img/backgrounds/bg1.jpg')",
        'forest-green': "url('/public/img/backgrounds/bg2.jpg')",
        'mountain-cottage': "url('/public/img/backgrounds/bg3.jpg')",
        'clouds': "url('/public/img/backgrounds/bg4.jpg')",
        'northern-lights': "url('/public/img/backgrounds/bg5.jpg')",
        'mountain-lake': "url('/public/img/backgrounds/bg6.jpg')",
        'northern-lights-2': "url('/public/img/backgrounds/bg7.jpg')",
        'forest-light': "url('/public/img/backgrounds/bg8.jpg')",
      }
    },
  },
  plugins: [],
}


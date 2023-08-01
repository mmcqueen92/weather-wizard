/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'bingus': "url('/public/img/backgrounds/bg1.jpg')",
        'bongus': "url('/public/img/backgrounds/bg2.jpg')",
        'dingus': "url('/public/img/backgrounds/bg3.jpg')",
        'dongus': "url('/public/img/backgrounds/bg4.jpg')",
        'plingus': "url('/public/img/backgrounds/bg5.jpg')",
        'plongus': "url('/public/img/backgrounds/bg6.jpg')",
        'tringus': "url('/public/img/backgrounds/bg7.jpg')",
        'trongus': "url('/public/img/backgrounds/bg8.jpg')",
      }
    },
  },
  plugins: [],
}


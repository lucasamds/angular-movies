/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'dark': '#0b0b0b',
        'darkred': '#841526',
      },
      backgroundImage:{
        'Tenet': "url('/angular-movies/src/assets/thumbnails/Tenet.png')",
        'Spider Man': "url('/angular-movies/src/assets/thumbnails/Spider Man.png')",
        'Knives Out': "url('/angular-movies/src/assets/thumbnails/Knives Out.png')",
        'Guardians of The Galaxy': "url('/angular-movies/src/assets/thumbnails/Guardians of The Galaxy.png')",
        'Avengers': "url('/angular-movies/src/assets/thumbnails/Avengers.png')",
      }
    },
  },
  plugins: [],
}


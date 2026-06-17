/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../core/tailwind.config.js')],
  theme: {
    extend: {
      colors: {
        sand: '#e5d6bf',
        limeade: '#b6aa08',
        skyBlue: '#5196d7'
      }
    }
  }
}

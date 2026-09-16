/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../core/tailwind.config.js')],
  theme: {
    extend: {
      colors: {
        sand: '#e5d6bf',
        sandDark: '#b0a595',
        limeade: '#b6aa08',
        skyBlue: '#5196d7',
        // blackFrame: '#232323',
        blackFrame: '#27272E',
        brownFrame: '#5b4832'
      }
    }
  }
}

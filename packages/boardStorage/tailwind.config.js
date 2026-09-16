/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    presets: [require('../core/tailwind.config.js')],
    fontFamily: {
      primary: ['Avenir', 'serif'],
      secondary: ['Myriad Pro', 'serif']
    }
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      sm: "480px",
      md: "1024px",
      lg: "1440px"
    },
    colors: {
      amberYellow: "#ba8723",
      lightYellow: "#E9C465",
      waveBlue: "#1A304E",
      boardRed: "#6B1F15",
      white: "#fff",
      lightGrey: "#fafafa",
      blackSoft: "#444",
      black: "#09090e",
      pink: "#fff0f5",
      yellow: "#fffacd"
    },
    fontFamily: {
      metalsmith: ["Metalsmith", "sans-serif"],
      avenir: ["Avenir Next", "serif"],
      myriad: ["Myriad Pro Regular", "serif"]
    },
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.5rem",
      1: "1rem",
      1.5: "1.5rem",
      2: "2rem",
      2.5: "2.5rem",
      3: "3rem",
      3.5: "3.5rem",
      4: "4rem",
      4.5: "4.5rem",
      5: "5rem",
      6: "6rem",
      7: "7rem",
      8: "8rem",
      9: "9rem",
      10: "10rem",
      25: "25rem"
    },
    fontSize: {
      sm: '1rem',
      base: '2.2rem',
      xl: '2.5rem',
      '2xl': '3rem',
      '3xl': '3.5rem',
      '4xl': '4rem',
      '5xl': '4.5rem',
    },
    extend: {},
  },
}

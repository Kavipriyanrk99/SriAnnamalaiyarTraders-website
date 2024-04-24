/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./build/*.html', './build/js/*.js'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Noto Serif"', ...defaultTheme.fontFamily.serif],
        'sans': ['"Oswald"', ...defaultTheme.fontFamily.sans],
        'openSans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        'sourceSans': ['"Source Sans 3"', ...defaultTheme.fontFamily.sans] 
      }
    },
  },
  plugins: [],
}


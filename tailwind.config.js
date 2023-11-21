/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,sass,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'red': '#FF4438',
        'green': '#21CE90',
        'violet': '#8B42FF',
        'yellow-second': '#FFF6E0',
        'violet-second': '#DECDFA',
        'violet-third': '#EBDFFF',
        'background': '#F8F7FB',
        'background-green': '#D9F1E9',
        'background-red': '#ffcbc4',
        'dark': '#06010D',
        'gray': '#585962',
        'white': '#FFFFFF',
        'border-gray': '#E3E3E3',
        'border-violet': '#8F64D22B',
        'border-green': '#77E5BE',
        'border-red': '#fb6c61'
      }
    }
  },
  plugins: [],
}


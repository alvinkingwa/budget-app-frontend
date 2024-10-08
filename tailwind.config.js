/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F8FAFC',
        'primary': '#00F0FF',
        'latestbg': '#f6f6f6',
        'firstcard': '#eef2ff',
        'secondcard': '#fef2f2',
        'thirdcard': '#f0fdf4',
        'fourthcard': '#fef3c7'
      },
      fontFamily: {
        display: ["Eczar", "serif"],
      },
      height: {
        'transaction-table-h': '19rem',
        'trans-h':'36rem',
        'set-budget':'39rem',
        'set-bdudget-small-screen':'70rem',
        'monthly-category':'28rem',
        'height-trasaction-table':'23rem'
      },
      width: {
        '120': '25rem',
        '160': '40rem',
        '130': '30rem',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}


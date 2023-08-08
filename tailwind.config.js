/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
        colors:{
      'background': '#F8FAFC',
      'primary':'#00F0FF'
    },
    fontFamily: {
      display: ["Eczar", "serif"],
    },
    width: {
      '120': '25rem',   
      '160': '40rem',   
    },
    },
  },
  plugins: [],
}


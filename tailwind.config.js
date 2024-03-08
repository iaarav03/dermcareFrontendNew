/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
 
    // colors:{
    //    box:'#f2eeea'
    // },
    extend: {
      fontFamily: {
        'fasthand': ['Fasthand', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
        'libre-baskerville': ['Libre Baskerville', 'serif'],
      },
    },
  },
  plugins: [],
}
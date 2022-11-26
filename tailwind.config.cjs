/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tb-background': '#DEDEDE',
        'tb-text': '#505050',
      },
      fontFamily: {
        'dotGothic': [ 'DotGothic16', 'Helvetica', 'Arial' ],
      },
      keyframes: {
        load: {
          '0%': { transform: 'translate(-400%)' },
          '100%': { transform: 'translate(400%)' },
        }
      },
    },
  },
  plugins: [],
}

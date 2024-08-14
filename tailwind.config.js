/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        pending: '#F2994A',
        green: {
          100: '#D9F2B8', // Lightest shade (approximation)
          200: '#B3E48E', // Light shade (approximation)
          300: '#8ED764', // Intermediate light shade (approximation)
          400: '#75C94A', // Intermediate shade (approximation)
          500: '#61B923', // Provided shade
          600: '#4B9719', // Provided shade
          700: '#3C7918', // Intermediate dark shade (approximation)
          800: '#315C18', // Provided shade
          900: '#264916', // Darkest shade (approximation)
        },
        navyblue: '#12263A',
        blue: '#3489C3',
        secondary: {
          100: '#D6EAF5',
          200: '#AED4EB',
          300: '#85BFE0',
          400: '#59A3D7',
          500: '#4287C1',
          600: '#246CA5',
          700: '#205B8A',
          800: '#1A4B74',
          900: '#1D405D',
        },
      },
    },
  },
  plugins: [],
};
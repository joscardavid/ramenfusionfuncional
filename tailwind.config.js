/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: '#1A1A1A',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        'surface-dark': '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
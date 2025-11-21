/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a855f7',
        secondary: '#ec4899'
      },
      boxShadow: {
        glass: '0 20px 40px rgba(168,85,247,0.22)'
      },
      borderRadius: {
        xl: '18px'
      }
    }
  },
  plugins: [],
};
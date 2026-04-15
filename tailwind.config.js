/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          900: '#0a1628',
          800: '#1a2b4a',
          700: '#2a4068',
        },
        gold: {
          500: '#d4af37',
          600: '#b8941f',
        }
      }
    },
  },
  plugins: [],
}

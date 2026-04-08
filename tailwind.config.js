/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
      },
      fontFamily: {
        bengali: ['Hind Siliguri', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

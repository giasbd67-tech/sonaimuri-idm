/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // এখানে আমি গাঢ় সবুজ কালার (#065F46) ব্যবহার করেছি
        primary: '#065F46', 
      },
      fontFamily: {
        bengali: ['Hind Siliguri', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

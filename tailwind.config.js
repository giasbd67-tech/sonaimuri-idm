/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // সোনাইমুড়ী মাদরাসা প্রজেক্টের জন্য গাঢ় সবুজ কালার
        primary: '#065F46', 
      },
      fontFamily: {
        // আপনার পছন্দের বাংলা ফন্ট
        bengali: ['Hind Siliguri', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

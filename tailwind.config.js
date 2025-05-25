// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./public/index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./Components/**/*.{js,jsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {},
    },
    plugins: [],
  }
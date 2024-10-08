/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        primary: '#eab308',
        secondary: '#1f2937',
       
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'], // Add your desired mono font here
      },
    },
  },
  plugins: [],
}


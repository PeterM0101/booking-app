/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html","./src/**/*.{js,jsx,tsx,ts}"],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: '2rem',
        md: '10rem'
      }
    }
  },
  plugins: [],
}


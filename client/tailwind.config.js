/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': {
          50: '#FEFCF9',
          100: '#F8F5F0',
          200: '#F3EFE6',
        },
        'brown': {
          100: '#EFEBE9',
          600: '#8D6E63',
          700: '#5D4037',
          800: '#4E342E',
        },
      },
      fontFamily: {
        'serif':,
        'sans': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins:,
}
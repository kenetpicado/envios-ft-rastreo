/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gulf-blue': {
          50: '#e8f4ff',
          100: '#d5eaff',
          200: '#b4d6ff',
          300: '#87b9ff',
          400: '#578eff',
          500: '#3162ff',
          600: '#0e31ff',
          700: '#0527fd',
          800: '#0825cb',
          900: '#112a9e',
          950: '#0a165a'
        }
      }
    }
  },
  plugins: []
}

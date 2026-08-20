/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff5a1f',
          dark: '#0a1128',
          card: '#15203b',
          info: '#eff6ff',
          infoText: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f0f12',
        cardBg: '#18181b',
        accentPurple: '#4f46e5',
      },
    },
  },
  plugins: [],
}
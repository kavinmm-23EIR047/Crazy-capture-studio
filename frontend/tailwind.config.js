/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        phoneRing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(10deg)' },
          '80%': { transform: 'rotate(-5deg)' },
        },
      },
      animation: {
        phoneRing: 'phoneRing 1s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

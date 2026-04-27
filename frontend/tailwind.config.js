/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        gold: '#E8B84B',
        'gold-dark': '#C99A35',
      },
      keyframes: {
        phoneRing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%':  { transform: 'rotate(15deg)' },
          '40%':  { transform: 'rotate(-10deg)' },
          '60%':  { transform: 'rotate(10deg)' },
          '80%':  { transform: 'rotate(-5deg)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':       { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'phone-ring': 'phoneRing 1.4s ease-in-out infinite',
        'float':      'floatY 5s ease-in-out infinite',
        'glow':       'glowPulse 3s ease-in-out infinite',
        'spin-slow':  'spinSlow 40s linear infinite',
        'fade-up':    'fadeUp 0.7s ease forwards',
        'shimmer':    'shimmer 3s linear infinite',
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      screens: {
        'xs': '480px',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        400: '400ms',
        600: '600ms',
        650: '650ms',
        700: '700ms',
      },
    },
  },
  plugins: [],
};

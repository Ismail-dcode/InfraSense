/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        infrasense: {
          dark: '#07090e',
          card: 'rgba(15, 23, 42, 0.75)',
          accent: '#10b981',
          'accent-light': '#34d399',
        },
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-slow-reverse': 'float-slow-reverse 10s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'grid-drift': 'grid-drift 60s linear infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
        'float-slow-reverse': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-20px, 20px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'grid-drift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
    },
  },
  plugins: [],
}

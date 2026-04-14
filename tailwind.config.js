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
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        success: '#10b981',
        danger:  '#ef4444',
        warning: '#f59e0b',
        dark: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a27',
          600: '#22222f',
          500: '#2d2d3d',
          400: '#3d3d50',
          300: '#5a5a72',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'bounce-subtle': 'bounceSlight 0.6s ease-out',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px #6366f1, 0 0 10px #6366f1' },
          'to':   { boxShadow: '0 0 20px #6366f1, 0 0 40px #4f46e5' },
        },
        slideIn: {
          'from': { transform: 'translateX(-20px)', opacity: '0' },
          'to':   { transform: 'translateX(0)',     opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)',
      },
    },
  },
  plugins: [],
}

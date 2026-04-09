/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, peaceful Sunday School palette
        cream: {
          50: '#FDFBF7',
          100: '#F9F6EF',
          200: '#F2EDE1',
          300: '#E8DFCF',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E3EBE3',
          200: '#C5D8C5',
          300: '#9BBE9B',
          400: '#6E9B6E',
          500: '#4A7C4A',
          600: '#366236',
          700: '#2D4F2D',
          800: '#263F26',
          900: '#203520',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#FAEBE4',
          200: '#F3D5C7',
          300: '#E9B5A0',
          400: '#DC8E70',
          500: '#D06C4A',
          600: '#C25335',
          700: '#A1422A',
          800: '#863826',
          900: '#6E3123',
        },
        navy: {
          50: '#F2F4F7',
          100: '#E5E8EF',
          200: '#CCD3E1',
          300: '#A7B4CC',
          400: '#7A8FB2',
          500: '#597299',
          600: '#465B7F',
          700: '#3A4A67',
          800: '#323F56',
          900: '#2D3649',
        },
        gold: {
          50: '#FDF9EF',
          100: '#FAEFD6',
          200: '#F4DAA8',
          300: '#EDC072',
          400: '#E5A342',
          500: '#DF8820',
          600: '#D16F18',
          700: '#AE5516',
          800: '#8B4419',
          900: '#703917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'warm': '0 4px 20px -2px rgba(74, 124, 74, 0.15)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

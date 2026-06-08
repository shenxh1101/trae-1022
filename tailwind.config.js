/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    },
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFE8DD',
          200: '#FFD1B9',
          300: '#FFB58C',
          400: '#FF8F5A',
          500: '#FF6B35',
          600: '#ED5623',
          700: '#C94419',
          800: '#A13616',
          900: '#752812',
        },
        cream: {
          50: '#FDFBF8',
          100: '#F9F3EA',
          200: '#F5E6D3',
          300: '#EBD5BA',
          400: '#DDBF9A',
          500: '#CBA77A',
        },
        brown: {
          50: '#F5F0ED',
          100: '#E8DED8',
          200: '#D1BDB3',
          300: '#B49586',
          400: '#6B4423',
          500: '#2C1810',
        },
        avocado: {
          400: '#A7C957',
          500: '#8FB339',
          600: '#6F8B2B',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
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
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px -4px rgba(44, 24, 16, 0.1)',
        'card-hover': '0 8px 30px -4px rgba(44, 24, 16, 0.18)',
        'glow': '0 0 30px -5px rgba(255, 107, 53, 0.3)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3F9',
          100: '#D9E3EE',
          200: '#B5C7DB',
          300: '#8BA6C2',
          400: '#5F82A8',
          500: '#3D6389',
          600: '#27496F',
          700: '#1B4577',
          800: '#12335C',
          900: '#0B2545',
          950: '#071A32',
        },
        teal: {
          50: '#EAF8F6',
          100: '#D5F2EF',
          200: '#A9E5E0',
          300: '#6FD6CE',
          400: '#3DC1B8',
          500: '#13A89E',
          600: '#0E8C84',
          700: '#0B6F69',
          800: '#0A5853',
          900: '#08423F',
        },
        amber: {
          100: '#FDEFCF',
          200: '#FBE0A0',
          300: '#F8CC6D',
          400: '#F5B841',
          500: '#EAA21B',
          600: '#C98405',
        },
        mist: '#F3F7FA',
        line: '#DCE5EC',
        body: '#3C4F63',
        muted: '#5B6E82',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,37,69,0.06), 0 16px 40px -16px rgba(11,37,69,0.22)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['SVN-Gilroy', 'sans-serif'],
        secondary: ['Reem Kufi', 'san-serif'],
      },
      colors: {
        primary: '#15463D',
        secondary: '#97BC62',
        info: '#1c92d4',
        success: '#1ac44a',
        warning: '#eaa912',
        danger: '#c91b1b',
        white: '#ffffff',
        dark: '#000000',
        semi: '#EFF2FE',
        meta: '#def4fc',
        alice: '#F0F8FF',
      },
      boxShadow: {
        shadow1: '0px 8px 24px rgba(139, 137, 137, 0.12)',
        shadow2: '0px 1rem 2rem rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        bgGradient: 'linear-gradient(to right bottom, #7dd56f, #28b487)',
      },
    },
  },
  plugins: [],
};

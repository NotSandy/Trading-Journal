module.exports = {
  mode: 'jitt',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': {
        100: '#556FE7',
        200: '#D5DAF9',
      },
      'info': {
        100: '#51A5F0',
        200: '#D3E9FA',
      },
      'success': {
        100: '#34C28E',
        200: '#CDF1E3',
      },
      'warning': {
        100: '#F1B54A',
        200: '#FAECD3',
      },
      'danger': {
        100: '#F56A6B',
        200: '#FCDBDB',
      },
      'secondary': {
        100: '#f3effc',
        200: '#805dca',
      },
      'dark': {
        100: '#e3e4eb',
        200: '#3b3f5c',
      },
      'dark-bg': {
        100: '#2A3042',
        200: '#272A3C',
        300: '#222736',
      },
      'light-bg': {
        100: '#FEFFFE',
        200: '#F9F8FA',
      },
      'dark-text': {
        100: '#74788d',
        200: '#495057',
      },
      'light-text': {
        100: '#f6f6f6',
        200: '#c3cbe4',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

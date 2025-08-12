module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2d365a',
          700: '#1e253c',
        },
        secondary: {
          900: '#181b2a',
          800: '#23263a',
        },
        yellow: {
          400: '#ffb300',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

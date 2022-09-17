/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    screens: {
      md: '768px',
      'slide-900': '900px',
      'slide-1146': '1146px',
      'slide-1344': '1330px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        galaxy: "url('./background-galaxy.png')",
        'nlw-gradient':
          'linear-gradient(89.86deg, #9572FC 15.08%, #43E7AD 45.94%, #E1D55D 90.57%)',
        'game-gradient':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
    },
  },
  plugins: [],
}

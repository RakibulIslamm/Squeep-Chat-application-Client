/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#30405F',
        'secondary': '#2A3751',
        'lightBlack': '#191C21',
        'sidebarBg': '#1F293D',
        'yellow': '#FFE14C',
        'green': '#39FF14',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  },
}

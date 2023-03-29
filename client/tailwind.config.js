/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "logo-color": "#FF9900",
        "grayDark" : "#767474",
        "orange" : "#FFAF38",
        "graylight": "#BFBFBF",
        "graydimmer":"#E8E8E8",
        "adminbg" : "#F0F1F3"

      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

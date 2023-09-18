/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {  // Define a new keyframe
        shimmer: {
          '100%': { transform: 'translateX(100%)' }  // translateX(100%) means move an element all the way to the right hand side.
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite'  // shimmer means we want to use that shimmer property defined in our keyframe.
      }
    },
  },
  plugins: [],
}
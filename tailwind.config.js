/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'sm': '540px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   mode: 'jit',
//   purge: {
//     enabled: process.env.NODE_ENV === 'production',
//     // classes that are generated dynamically, e.g. `rounded-${size}` and must
//     // be kept
//     safeList: [],
//     content: [
//       './index.html',
//       './src/**/*.{vue,js,ts}',
//       // etc.
//     ],
//   },
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter var', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
// }
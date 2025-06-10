/** @type {import('tailwindcss').Config} */
import fluid, {
  extract,
  screens
} from 'fluid-tailwind'

module.exports = {
  content: {
    files: [
      'index.html',
      './about/index.html',
      './project/index.html',
      './dist/js/*.js',
      './dist/flowbite/**/*.js'
    ],
    extract: {
      DEFAULT: extract
    }
  },
  safelist: [
    'text-[#d19a66]',
    'text-[#98b75d]',
    'text-[#c677d1]',
    'text-[#61afef]',
    'text-[#bbbbbb]',
    'text-[#c678dd]',
  ],
  theme: {
    extend: {
      fluidType: {
        settings: {
          fontSizeMin: 1.125,
          fontSizeMax: 3,
          screenMin: 320,
          screenMax: 1280,
        },
        values: {
          sm: [1, 1.5],
          base: [1.125, 2],
          lg: [1.5, 3],
          xl: [2, 4],
        },
      },
    },
  },
  plugins: [
    fluid,
    require('flowbite/plugin'), 
    require('tailwind-scrollbar')
  ],
}
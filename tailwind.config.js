/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}


/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: [
    // Classes dynamiques
    { pattern: /^bg-(red|green|blue|yellow|indigo|purple|pink|gray|primary)-(50|100|200|300|400|500|600|700|800|900)$/ },
    { pattern: /^text-(red|green|blue|yellow|indigo|purple|pink|gray|primary)-(50|100|200|300|400|500|600|700|800|900)$/ },
    { pattern: /^border-(red|green|blue|yellow|indigo|purple|pink|gray|primary)-(50|100|200|300|400|500|600|700|800|900)$/ },
    { pattern: /^ring-(red|green|blue|yellow|indigo|purple|pink|gray|primary)-(50|100|200|300|400|500|600|700|800|900)$/ },
    // Pour les animations
    'animate-bounce', 'animate-pulse', 'animate-spin',
  ],
}

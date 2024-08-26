/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdex}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdex}",
    ".src//pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Dark-blue' : '#384358'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


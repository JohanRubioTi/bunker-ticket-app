/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': 'rgb(255, 0, 102)',
        'electric-purple': 'rgb(186, 0, 255)',
        'bright-teal': 'rgb(0, 255, 204)',
        'vivid-yellow': 'rgb(255, 255, 0)',
      },
      backgroundImage: {
        'tickets-gradient': 'linear-gradient(225deg, #000 0%, #000 20%, var(--color-neon-pink) 25%, #000 30%, #000 40%, var(--color-electric-purple) 45%, #000 50%, #000 60%, var(--color-bright-teal) 65%, #000 70%, #000 80%, var(--color-vivid-yellow) 85%, #000 90%, #000 100%)',
      },
      backgroundSize: {
        '400': '400% 400%',
      },
      animation: {
        gradientShift: 'gradientShift 10s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}

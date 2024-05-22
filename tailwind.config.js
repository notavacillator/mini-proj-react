import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-right': 'bounceRight 1s infinite ease-in-out 2s'
      },
      keyframes: {
        bounceRight: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(0.6rem)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  daisyui: {
        themes: [
          {
            mytheme: {
              "primary": "#2563eb",
              "secondary": "#7dd3fc",
              "accent": "#d946ef",
              "neutral": "#e7e5e4",
              "base-100": "#e5e7eb",
              "dark": "#001523",
              "info": "#eab308",
              "success": "#22c55e",
              "warning": "#f97316",
              "error": "#dc2626",
            },
          },
        ],
      },
  plugins: [
    daisyui,
  ],
}


import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Jobble Color Scheme
        'jobble-red': '#DC0000',       // Primary Red
        'jobble-red-light': '#FF3838', // Light Red (Hover, accents)
        'jobble-navy-dark': '#050E3C', // Dark Navy (Text, borders, shadows)
        'jobble-navy': '#002455',      // Navy Blue (Secondary text, tags)
        'jobble-green': '#28a745',     // Success Green
        'jobble-bg': '#F0F4F8',        // Light BG

        // Legacy Mappings (Aliased to Jobble colors)
        'lokal-orange': '#DC0000',       // -> jobble-red
        'lokal-orange-light': '#FF3838', // -> jobble-red-light
        'lokal-yellow': '#DC0000',       // -> jobble-red
        'lokal-green': '#28a745',        // -> jobble-green
        'lokal-purple': '#002455',       // -> jobble-navy
        'lokal-dark': '#050E3C',         // -> jobble-navy-dark
        'lokal-gray': '#002455',         // -> jobble-navy
        'lokal-light': '#F0F4F8',        // -> jobble-bg
        'peep-blue': '#002455',          // -> jobble-navy
        'jobble-blue': '#002455',        // -> jobble-navy
      },
      boxShadow: {
        'neobrutalism': '4px 4px 0px 0px #050E3C',
        'neobrutalism-hover': '6px 6px 0px 0px #050E3C',
        'neobrutalism-sm': '2px 2px 0px 0px #050E3C',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'float-up 2s ease-out forwards',
        'float-around': 'float-around 2.5s ease-out forwards',
      },
      keyframes: {
        'float-around': {
          '0%': { 
            transform: 'translate(0, 0) scale(0)', 
            opacity: '0' 
          },
          '20%': { 
            opacity: '1',
            transform: 'translate(calc(var(--end-x) * 0.2), calc(var(--end-y) * 0.2)) scale(1.2) rotate(calc(var(--rotation) * 0.2))'
          },
          '100%': { 
            transform: 'translate(var(--end-x), var(--end-y)) scale(0.3) rotate(var(--rotation))', 
            opacity: '0' 
          },
        },
        'float-up': {
            '0%': { 
              transform: 'translateY(0) translateX(0) scale(0.5) rotate(0deg)', 
              opacity: '0' 
            },
            '15%': { 
              opacity: '1', 
              transform: 'translateY(-30px) translateX(5px) scale(1) rotate(-5deg)' 
            },
            '50%': { 
              opacity: '1', 
              transform: 'translateY(-150px) translateX(-10px) scale(1.1) rotate(5deg)' 
            },
            '100%': { 
              transform: 'translateY(-350px) translateX(10px) scale(0.8) rotate(-10deg)', 
              opacity: '0' 
            },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        lokalTheme: {
          "primary": "#DC0000",
          "secondary": "#002455",
          "accent": "#FF3838",
          "neutral": "#050E3C",
          "base-100": "#ffffff",
          "base-200": "#F0F4F8",
          "base-300": "#E8ECF0",
          "info": "#002455",
          "success": "#28a745",
          "warning": "#FF3838",
          "error": "#DC0000",
        },
      },
      "light",
    ],
    defaultTheme: "lokalTheme",
  },
};

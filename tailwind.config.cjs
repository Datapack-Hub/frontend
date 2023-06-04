
/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        brand: ["Lexend", "sans-serif"],
        console: ["Space Mono", "monospace"]
      },
      colors: {
        'pearl-lusta': {
          '50': '#fffdfa',
          '100': '#fff3e0',
          '200': '#ffe8c6',
          '300': '#ffd89e',
          '400': '#ffc266',
          '500': '#fdad36',
          '600': '#eb9617',
          '700': '#c67d0f',
          '800': '#a36911',
          '900': '#875915',
          '950': '#4a2e05',
        },
        "dph-orange": "#ff631a",
      },
      scale: {
        '102': '1.02',
      }
    },
  },

  safelist: [
    "outline-dph-orange",
    "bg-dph-orange",
    "outline-blue-600",
    "bg-blue-600",
    "outline-stone-600",
    "bg-stone-600"
  ],

  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;

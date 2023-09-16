
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
        "dph-orange": "#ff631a",
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
      }
    },
  },

  safelist: [
    "outline-dph-orange",
    "bg-dph-orange",
    "outline-blue-600",
    "bg-blue-600",
    "outline-zinc-600",
    "bg-zinc-600",
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
    "text-zinc-500"
  ],

  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;

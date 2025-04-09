// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-assistant)", "sans-serif"],
        display: ["var(--font-commissioner)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

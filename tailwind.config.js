/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Your source files
    "./src/**/*.css", // Also scan your CSS files for @apply or @layer
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

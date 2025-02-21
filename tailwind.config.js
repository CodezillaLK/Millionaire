/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      fontFamily: {
        primary: "Alexandria, ui-sans-serif, system-ui, sans-serif",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1440px",
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', "sans-serif"], // Default font
        serif: ['"Noto Serif TC"', "serif"], // For specific text
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      Text: "#FAFAFA",
      Secondary: "#F5F5F5",
      Secondary2: "#DB4444",
      LightGreen: "#00FF66",
      Gray:"#c5c2c2d2",
      VeryLightGreen:"#CBE4E8",
      Red: "#EB102F",
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
  },
  plugins: [],
};

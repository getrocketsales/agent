import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          purple: "#592b77",
          "purple-mid": "#8b4b94",
          orange: "#f37850",
          dark: "#2F3B40",
          light: "#edf0f2",
          "light-purple": "#e6e2e9",
          gold: "#fdc880",
        },
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "Oswald", "sans-serif"],
        body: ["var(--font-karla)", "Karla", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;

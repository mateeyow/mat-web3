import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        coin: "#FFDE45",
      },
      boxShadow: {
        pixel:
          "rgb(var(--color-box-shadow)) 0px 4px, rgb(var(--color-box-shadow)) 0px -4px, rgb(var(--color-box-shadow)) 4px 0px, rgb(242, 243, 244) -4px 0px",
      },
      backgroundImage: {},
      fontFamily: {
        sans: ["var(--font-pixel)"],
      },
      gridTemplateRows: {
        content: "auto 1fr",
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 200ms cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

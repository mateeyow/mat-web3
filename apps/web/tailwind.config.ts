import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        coin: '#FFDE45',
      },
      boxShadow: {
        pixel: 'rgb(var(--color-box-shadow)) 0px 4px, rgb(var(--color-box-shadow)) 0px -4px, rgb(var(--color-box-shadow)) 4px 0px, rgb(242, 243, 244) -4px 0px',
      },
      backgroundImage: {},
      fontFamily: {
        sans: ['var(--font-pixel)']
      },
      gridTemplateRows: {
        content: 'auto 1fr',
      }
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        sans: ['var(--font-pixel)']
      }
    },
  },
  plugins: [],
};

export default config;

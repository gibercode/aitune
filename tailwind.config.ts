import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      barlow: ["var(--barlowCondensed)", "sans-serif"],
      quicksand: ["var(--quickSand)", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        s_green: {
          "50": "#effef4",
          "100": "#dafee6",
          "200": "#b8facf",
          "300": "#81f4ab",
          "400": "#43e57e",
          "500": "#1bd760",
          "600": "#0faa48",
          "700": "#10853c",
          "800": "#126933",
          "900": "#11562c",
          "950": "#033016",
        },
        c_gray: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#262626",
        },
      },
    },
  },
  plugins: [],
};
export default config;

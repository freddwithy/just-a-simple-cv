import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mystic': {
          '50': '#f6f8f9',
          '100': '#ecf0f2',
          '200': '#dce3e7',
          '300': '#b0c0c9',
          '400': '#859eab',
          '500': '#668391',
          '600': '#516a78',
          '700': '#425662',
          '800': '#3a4a52',
          '900': '#334047',
          '950': '#222a2f',
        },
      }
    }
  },
  plugins: [],
};
export default config;

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
          '50': '#effef7',
          '100': '#dafeef',
          '200': '#b8fadd',
          '300': '#81f4c3',
          '400': '#43e5a0',
          '500': '#1acd81',
          '600': '#0fa968',
          '700': '#108554',
          '800': '#126945',
          '900': '#11563a',
          '950': '#03301f',
      },
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
export default config;

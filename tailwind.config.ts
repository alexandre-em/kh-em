import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'kenburns-top': 'kenburns-top 30s ease-out both',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'kenburns-top': {
          '0%': { transform: 'scale(1) translateY(0)', transformOrigin: '50% 16%' },
          '100%': { transform: 'scale(1.25) translateY(-15px)', transformOrigin: 'top' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

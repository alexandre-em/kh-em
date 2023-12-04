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
        'slide-in-bck': 'slide-in-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'kenburns-top': 'kenburns-top 30s ease-out both',
        'bounce-in-top': 'bounce-in-top 1.1s both',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'bounce-in-top': {
          '0%': {
            transform: 'translateY(-500px)',
            animationTimingFunction: 'ease-in',
            opacity: '0',
          },
          '38%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
            opacity: '1',
          },
          '55%': {
            transform: 'translateY(-65px)',
            animationTimingFunction: 'ease-in',
          },
          '72%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
          },
          '81%': {
            transform: 'translateY(-28px)',
            animationTimingFunction: 'ease-in',
          },
          '90%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
          },
          '95%': {
            transform: 'translateY(-8px)',
            animationTimingFunction: 'ease-in',
          },
          '100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
          },
        },
        'kenburns-top': {
          '0%': { transform: 'scale(1) translateY(0)', transformOrigin: '50% 16%' },
          '100%': { transform: 'scale(1.25) translateY(-15px)', transformOrigin: 'top' },
        },
        'slide-in-bck': {
          '0%': {
            transform: 'translateX(-600px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

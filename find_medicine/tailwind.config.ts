import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-7%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
          }
        }
      }
    }
  },
  plugins: []
};
export default config;

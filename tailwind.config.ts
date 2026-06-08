import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ghost: {
          bg: '#0a0a0a',
          surface: '#111111',
          border: '#1f1f1f',
          muted: '#333333',
          text: '#e8e8e8',
          dim: '#888888',
          accent: '#c8ff00',
          'accent-dim': '#a0cc00',
        },
      },
    },
  },
  plugins: [],
};

export default config;

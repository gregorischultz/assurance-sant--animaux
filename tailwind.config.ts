import type { Config } from 'tailwindcss';

/**
 * Poilou — Design Tokens → Tailwind theme
 * Usage: bg-cta, text-green-dark, font-display, rounded-2xl, shadow-cta, etc.
 * Fontes carregadas via next/font (Poppins + Inter) em app/layout.tsx.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: '#1B8A5E', dark: '#0E5A3C', tint: '#E9F5EF', tint2: '#F3F7F1' },
        cta: {
          DEFAULT: '#FF7A54',
          hover: '#ED6238',
          active: '#C64E28',
          tint: '#FFEDE5',
          tint2: '#FFF3EC',
          border: '#FFB79E',
        },
        ink: '#24221E',
        text: '#3A382F',
        muted: { DEFAULT: '#6E695F', 2: '#55514A' },
        bg: { DEFAULT: '#FBF8F3', 2: '#F1EEE7' },
        card: '#FFFFFF',
        line: { DEFAULT: '#EBE5DA', 2: '#E1DCD1' },
        star: '#F5A623',
        footer: { text: '#8A857B', text2: '#B7B2A8' },
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['SF Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['56px', '1.05'],
        h1: ['44px', '1.1'],
        h2: ['40px', '1.1'],
        h3: ['34px', '1.15'],
        h4: ['28px', '1.2'],
        title: ['22px', '1.25'],
        lead: ['20px', '1.5'],
        body: ['18px', '1.7'],
        'body-sm': ['17px', '1.5'],
        small: ['15px', '1.5'],
        caption: ['14px', '1.5'],
        micro: ['13px', '1.5'],
        'micro-2': ['12px', '1.4'],
        'm-h2': ['30px', '1.08'],
        'm-h3': ['24px', '1.15'],
      },
      letterSpacing: {
        tighter: '-0.025em',
        tight: '-0.02em',
        wide: '0.06em',
        wider: '0.12em',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '30': '120px',
      },
      borderRadius: {
        sm: '10px',
        md: '12px',
        lg: '14px',
        xl: '18px',
        '2xl': '22px',
        '3xl': '28px',
        pill: '999px',
      },
      boxShadow: {
        cta: '0 12px 24px -8px rgba(255,122,84,0.60)',
        card: '0 20px 44px -28px rgba(0,0,0,0.25)',
        'card-green': '0 24px 50px -20px rgba(27,138,94,0.40)',
        float: '0 16px 34px -12px rgba(0,0,0,0.28)',
        frame: '0 40px 90px -30px rgba(0,0,0,0.40)',
      },
      maxWidth: {
        content: '1240px',
        reading: '720px',
      },
    },
  },
  plugins: [],
};

export default config;

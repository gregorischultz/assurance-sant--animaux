import type { Config } from 'tailwindcss';

/**
 * Poilou — Design Tokens → Tailwind theme
 * Usage: bg-accent, text-primary-dark, font-display, rounded-2xl, shadow-accent, etc.
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
        // Primaire — bleu profond (marque, structure, liens, en-têtes)
        primary: { DEFAULT: '#1E5F8C', dark: '#164A6E', tint: '#E7F0F7', tint2: '#F1F6FA' },
        // Accent — corail : réservé aux boutons CTA.
        //  DEFAULT = corail de marque (bordures, badges, tints).
        //  fill / fill-hover / fill-active = fond des boutons, assombri pour garantir
        //  un contraste AA (≥ 4.5:1) avec du texte blanc (#FF6B5A seul = 2.8:1, échoue).
        accent: {
          DEFAULT: '#FF6B5A',
          fill: '#D33F2E',
          'fill-hover': '#B8341F',
          'fill-active': '#9E2B18',
          active: '#D33F2E',
          tint: '#FFECE9',
          tint2: '#FFF4F1',
          border: '#FFB0A5',
        },
        // Succès — vert : uniquement pour les icônes (coches, confirmations).
        success: { DEFAULT: '#2E9E6B', tint: '#E4F4EC' },
        ink: '#1F2A37',
        text: '#1F2A37',
        muted: { DEFAULT: '#5B6B7A', 2: '#485663' },
        background: { DEFAULT: '#FFF8F3', 2: '#F3ECE4' },
        surface: '#FFFFFF',
        line: { DEFAULT: '#ECE3D9', 2: '#DFD5C8' },
        star: '#F5A623',
        footer: { text: '#9AA6B0', text2: '#6E7A85' },
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
        accent: '0 12px 24px -8px rgba(211,63,46,0.45)',
        card: '0 20px 44px -28px rgba(0,0,0,0.25)',
        'card-primary': '0 24px 50px -20px rgba(30,95,140,0.35)',
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

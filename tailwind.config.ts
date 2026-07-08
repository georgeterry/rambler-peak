import type { Config } from 'tailwindcss';

// Brand tokens map to CSS custom properties defined in src/app/globals.css.
// Using vars means we get /alpha modifier support and a single source of truth.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rp: {
          blue: 'rgb(var(--rp-blue) / <alpha-value>)',
          'blue-dark': 'rgb(var(--rp-blue-dark) / <alpha-value>)',
          charcoal: 'rgb(var(--rp-charcoal) / <alpha-value>)',
          slate: 'rgb(var(--rp-slate) / <alpha-value>)',
          mist: 'rgb(var(--rp-mist) / <alpha-value>)',
          white: 'rgb(var(--rp-white) / <alpha-value>)',
          rust: 'rgb(var(--rp-rust) / <alpha-value>)',
          hairline: 'rgb(var(--rp-hairline) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(2.75rem, 5.5vw + 1rem, 4.5rem)', { lineHeight: '1.06', letterSpacing: '0.03em', fontWeight: '600' }],
        'display-2': ['clamp(2.125rem, 3.5vw + 1rem, 3rem)', { lineHeight: '1.12', letterSpacing: '0.03em', fontWeight: '600' }],
        'h1-brand': ['clamp(1.75rem, 2vw + 1rem, 2.25rem)', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '600' }],
        'h2-brand': ['clamp(1.375rem, 1vw + 1rem, 1.75rem)', { lineHeight: '1.28', letterSpacing: '0.02em', fontWeight: '600' }],
        'subhead': ['1.125rem', { lineHeight: '1.55', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.35', letterSpacing: '0.14em', fontWeight: '500' }],
        'caption': ['0.8125rem', { lineHeight: '1.4' }],
      },
      letterSpacing: {
        display: '0.03em',
        headline: '0.02em',
        eyebrow: '0.14em',
      },
      maxWidth: {
        container: '80rem',
        prose: '68ch',
      },
      spacing: {
        section: '5rem',
        'section-lg': '7.5rem',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,26,32,.04), 0 8px 24px rgba(20,26,32,.06)',
        'inset-ring': '0 0 0 3px rgb(255 255 255 / 0.95), 0 8px 24px rgba(0,0,0,0.25)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(.2,.6,.2,1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(.2,.6,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;

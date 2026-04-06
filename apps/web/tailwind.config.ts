import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          foreground: 'var(--color-secondary-foreground)',
        },
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        border: 'var(--color-border)',
        ring: 'var(--color-ring)',
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
      },
      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        sans: ['var(--typography-font-family)', 'sans-serif'],
        mono: ['var(--typography-font-family-mono)', 'monospace'],
      },
      // ── Letter spacing ──────────────────────────────────────
      letterSpacing: {
        tight: 'var(--typography-letter-spacing-tight)',
        normal: 'var(--typography-letter-spacing-normal)',
        wide: 'var(--typography-letter-spacing-wide)',
        wider: 'var(--typography-letter-spacing-wider)',
        widest: 'var(--typography-letter-spacing-widest)',
      },
      // ── Border radius ───────────────────────────────────────
      borderRadius: {
        DEFAULT: 'var(--spacing-border-radius)',
        sm: 'var(--spacing-border-radius-sm)',
        lg: 'var(--spacing-border-radius-lg)',
        full: 'var(--spacing-border-radius-full)',
      },
      // ── Shadows ─────────────────────────────────────────────
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};

export default config;
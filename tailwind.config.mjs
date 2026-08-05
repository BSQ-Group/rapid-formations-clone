/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx,css}'],
  darkMode: ['selector', '.theme-rapidformations'],
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.bg-sunset': {
          background:
            'linear-gradient(215.3deg,#FF0404 2.01%,#FDA700 103.01%),radial-gradient(150.34% 106.81% at 106.34% 11.13%,#FF50F8 0.01%,rgba(255,92,1,0) 100%),conic-gradient(from 46.92deg at -13.59% 49.95%,rgba(255,25,25,0) 0deg,#B127F1 68.73deg,rgba(255,25,25,0) 360deg)',
          'background-blend-mode': 'color-dodge',
        },
        '.bg-aurora': {
          background:
            'linear-gradient(215.3deg, #4200ff 2.01%, #19f196 103.01%),radial-gradient(114.21% 62.06% at 116.07% 21.46%, #00fff0 0.01%, rgba(0, 255, 240, 0) 100%),conic-gradient(from -70.84deg at 104.55% 70.66%, #0affa7 -84.6deg, rgba(255, 255, 255, 0) 46.8deg, #0affa7 275.4deg, rgba(255, 255, 255, 0) 406.8deg)',
          'background-blend-mode': 'multiply',
        },
        '.bg-template-card': {
          background:
            'radial-gradient(79.91% 63.1% at -8.76% -6.29%, #00F0FF 0.01%, #0A0069 100%),linear-gradient(202.11deg, #050054 1.28%, #C92FFF 132.8%)',
          'background-blend-mode': 'screen',
        },
        '.grid-cols-auto-fit': {
          'grid-template-columns': 'repeat(auto-fit, minmax(380px, 1fr))',
        },
      })
    },
  ],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-red',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'container',
    'grid-responsive',
    'bg-sunset',
    'bg-aurora',
    'bg-solar',
    'bg-sky',
    'bg-glow',
    'bg-template-card',
    'translate-z-0',
  ],
  theme: {
    colors: {
      white: 'rgba(var(--white) / <alpha-value>)',
      black: 'rgba(var(--black) / <alpha-value>)',
      transparent: 'transparent',
      current: 'currentColor',

      /* Semantic theme colors mapped to CSS variables */
      body: 'var(--surface-canvas)',
      background: 'var(--surface-canvas)',
      foreground: 'var(--text-strong)',
      primary: {
        DEFAULT: 'var(--surface-accent)',
        foreground: 'rgb(255 255 255)',
      },
      secondary: {
        DEFAULT: 'var(--surface-secondary)',
        foreground: 'var(--text-strong)',
      },
      muted: {
        DEFAULT: 'var(--surface-secondary)',
        foreground: 'var(--text-muted)',
      },
      accent: {
        DEFAULT: 'var(--surface-secondary)',
        foreground: 'var(--text-strong)',
      },
      destructive: {
        DEFAULT: 'var(--feedback-error-surface)',
        foreground: 'var(--feedback-error-surface)',
      },
      border: 'var(--border-subtle)',
      input: {
        DEFAULT: 'var(--control-input-border-idle)',
        bg: 'var(--control-input-background-light)',
        'bg-disabled': 'var(--surface-secondary)',
        border: 'var(--control-input-border-idle)',
      },
      ring: 'var(--border-focus)',
      card: {
        DEFAULT: 'var(--surface-primary)',
        foreground: 'var(--text-strong)',
        muted: 'var(--surface-secondary)',
        border: 'var(--border-subtle)',
        'border-light': 'var(--border-muted)',
      },
      popover: {
        DEFAULT: 'var(--surface-primary)',
        foreground: 'var(--text-strong)',
      },
      modal: 'var(--surface-primary)',
      select: {
        trigger: 'var(--surface-primary)',
        'trigger-hover': 'var(--surface-hover)',
        content: 'var(--surface-primary)',
        'item-hover': 'var(--surface-hover)',
        checkbox: 'var(--surface-primary)',
        muted: 'var(--text-muted)',
      },
      table: {
        bg: 'var(--surface-primary)',
        'bg-muted': 'var(--surface-secondary)',
        'row-bg': 'var(--surface-secondary)',
        border: 'var(--border-subtle)',
        text: 'var(--text-strong)',
        'text-muted': 'var(--text-muted)',
      },
      sidebar: {
        DEFAULT: 'var(--surface-primary)',
        foreground: 'var(--text-strong)',
        primary: 'var(--surface-accent)',
        'primary-foreground': 'rgb(255 255 255)',
        accent: 'var(--surface-secondary)',
        'accent-foreground': 'var(--text-strong)',
        border: 'var(--border-subtle)',
        ring: 'var(--border-focus)',
        bg: 'var(--surface-primary)',
        'bg-hover': 'var(--surface-hover)',
      },
      pagination: 'var(--surface-accent-muted)',
      datepicker: {
        bg: 'var(--surface-primary)',
        border: 'var(--border-subtle)',
      },
      'menu-item': {
        bg: 'var(--surface-hover)',
        'bg-hover': 'var(--surface-hover)',
      },
      checkbox: {
        border: 'var(--border-subtle)',
        'border-hover': 'var(--border-strong)',
      },
      'page-header': {
        bg: 'var(--surface-primary)',
        border: 'var(--border-subtle)',
        hover: 'var(--surface-hover)',
      },
      success: 'var(--feedback-success-background-muted)',
      warning: 'var(--feedback-warning-surface)',
      error: 'var(--feedback-error-background-muted)',
      chart: {
        1: 'var(--surface-accent)',
        2: 'var(--feedback-blue-500)',
        3: 'var(--text-muted)',
        4: 'var(--feedback-amber-400)',
        5: 'var(--feedback-red-200)',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) * 0.5)',
        sm: 'calc(var(--radius) * 0.25)',
        xs: 'calc(var(--radius) * 0.125)',
      },
      fontFamily: {
        primary: ['var(--font-inter)'],
        secondary: ['var(--font-work-sans)'],
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-inter)'],
      },
      lineHeight: {
        // Rapid Formations type ratios -- sp-rapid/src/styles/baseline.scss.
        // The port previously hardcoded the pixels these compute to, which
        // restates one fact per font-size and desyncs the moment a size moves.
        'rf-h1': '1.15',
        'rf-heading': '1.235',
        'rf-h4': '1.35',
        'rf-base': '1.5',
      },
      fontSize: {
        // Body-range tokens carry NO letter-spacing to match the Figma body family
        // (body-100/200/300/400 all = letter-spacing 0). These previously had
        // -0.01em/-0.02em, rendering all body copy slightly tighter than design (CORE-3721).
        xs: ['0.75rem', { lineHeight: '1rem' }], // 12px: LS -0.01em → 0
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px: LS -0.01em → 0
        md: ['1rem', { lineHeight: '1.5rem' }], // 16px: LS -0.02em → 0
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px: LS -0.02em → 0
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.25px' }],
        '2.5xl': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.04em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.25px' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-1px' }],
        // Headline line-heights match the Figma type scale (+8px rhythm). Previously these
        // carried lineHeight:1 (LH == font-size), rendering ~8px too short per line and causing
        // cumulative overlay drift (CORE-3721). statistic-*/display-* presets opt back into
        // tight leading via leading-none in Text.css, so big single-line numerals are unaffected.
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-1px' }], // 48px: LH 48px → 56px
        '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-2px' }], // 60px: LH 60px → 68px
        '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-2px' }], // 72px: LH 72px → 80px
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-2px' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-2px' }],
        '10xl': ['4.25rem', { lineHeight: '1.2', letterSpacing: '-0.04em' }],
        '11xl': ['4.5rem', { lineHeight: '1.2', letterSpacing: '-0.04em' }],
        '12xl': ['5rem', { lineHeight: '1.2', letterSpacing: '-0.04em' }],
        '13xl': ['5.25rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '14xl': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '15xl': ['5.625rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '16xl': ['7.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        wide: '1800px',
        '3xl': '1920px',
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text-strong)',
              '--tw-prose-headings': 'var(--text-strong)',
              h1: { fontWeight: 'normal', marginBottom: '0.25em' },
            },
          ],
        },
        base: {
          css: [{ h1: { fontSize: '2.5rem' }, h2: { fontSize: '1.25rem', fontWeight: 600 } }],
        },
        md: {
          css: [{ h1: { fontSize: '3.5rem' }, h2: { fontSize: '1.5rem' } }],
        },
      }),
    },
  },
}

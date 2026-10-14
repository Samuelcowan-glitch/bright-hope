/** @type {import('tailwindcss').Config} */

/* Palette taken from Gede rather than invented (see the imagery brief):
   the maroon of the real school uniform, the red-brown sand and plaster,
   equatorial sun, palm canopy, reef water, warm near-black ink. No pure
   white and no pure black anywhere — both look clinical beside these
   photographs. Contrast for every text pairing is at least 4.5:1 on paper:
   ink 15:1, primary 8.8:1, growth 7.1:1, muted 5.8:1. `accent` is ochre and
   is decorative only — on paper it measures 2.3:1, so it carries figures,
   rules and hover states, never body text. Where the sun colour has to
   carry words, use `accent-ink`. */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paper — the page base. Warm off-white, never #FFF.
        paper: '#FAF6EF',
        background: '#FAF6EF',
        surface: '#FFFCF6',
        // Sand — soil and unpainted plaster. Section backgrounds.
        sand: '#E8DCC8',
        'sand-light': '#F2EADB',
        // Ink — body text. Warm near-black, never #000.
        ink: '#241C18',
        'ink-soft': '#3A2E27',
        // Primary — the uniform maroon. Headings and the solid button.
        primary: '#7A2B33',
        'primary-dark': '#5E1F26',
        'primary-light': '#9C4049',
        // Accent — equatorial sun. Sparingly: figures, small rules, hovers.
        accent: '#D99830',
        'accent-dark': '#B87B1E',
        'accent-ink': '#8C5B12',
        // Muted — secondary text and captions.
        muted: '#6B5F56',
        'muted-light': '#8A7D71',
        // Growth — palm canopy and the hydroponics. Grounds the gold.
        growth: '#2E5D4B',
        'growth-dark': '#204236',
        // Coast — one cool, dusty note. Dividers and quiet sections.
        coast: '#4E8E93',
        'coast-dark': '#36676B',
        divider: '#E2D6C3',
        deep: '#2A211C',
      },
      fontFamily: {
        // Warm humanist serif for display, neutral grotesque for reading.
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // A deliberate scale, so every page steps the same way.
        'eyebrow': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
        'display-sm': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-xl': ['4rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        prose: '68ch',
        container: '76rem',
      },
      borderRadius: { '2.5xl': '1.25rem', '4xl': '2rem', '5xl': '2.5rem', '6xl': '3rem', '7xl': '4rem' },
      boxShadow: {
        // Paper-soft, warm-tinted. No glows, no glass.
        card: '0 1px 2px rgba(36,28,24,0.04), 0 8px 24px -12px rgba(36,28,24,0.12)',
        lift: '0 2px 4px rgba(36,28,24,0.05), 0 18px 40px -20px rgba(36,28,24,0.20)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}

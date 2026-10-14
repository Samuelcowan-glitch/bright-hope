/** @type {import('tailwindcss').Config} */

/* Palette taken from the Bright Hope Education logo: the sky blue of the
   "B" and the wordmark, the leaf green of the "H", the orange "E", the sun's
   gold and the teal of the book's swoosh. The logo shades are bright, so they
   decorate (rules, figures, hovers, backgrounds); where a colour carries
   words it uses a deeper shade of the same hue. Contrast on paper: ink 14.5:1,
   primary 5.4:1, growth 5.1:1, accent-ink 5.1:1, coast 5.7:1, muted 5.3:1. */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paper — the page base. A clean, faintly sky-tinted white.
        paper: '#F7FBFD',
        background: '#F7FBFD',
        surface: '#FFFFFF',
        // Sky wash — section backgrounds (token names kept so pages need no edits).
        sand: '#DCEEF8',
        'sand-light': '#EDF6FB',
        // Ink — body text. Deep navy from the book's spine, never #000.
        ink: '#14283A',
        'ink-soft': '#25394B',
        // Primary — the logo's sky blue, deepened for text. Headings and the solid button.
        primary: '#1B6E9E',
        'primary-dark': '#155A82',
        'primary-light': '#43B6F0',
        // Accent — the orange "E" and the sun. Sparingly: figures, small rules, hovers.
        accent: '#F98200',
        'accent-dark': '#FEA201',
        'accent-ink': '#A85400',
        // Muted — secondary text and captions.
        muted: '#5A6B78',
        'muted-light': '#7C8B96',
        // Growth — the leaf green "H" and "EDUCATION".
        growth: '#3B7A1A',
        'growth-dark': '#2C5C13',
        // Coast — the teal of the book's swoosh.
        coast: '#00706B',
        'coast-dark': '#005551',
        divider: '#D3E4EE',
        deep: '#10283B',
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
        card: '0 1px 2px rgba(20,40,58,0.04), 0 8px 24px -12px rgba(20,40,58,0.12)',
        lift: '0 2px 4px rgba(20,40,58,0.05), 0 18px 40px -20px rgba(20,40,58,0.20)',
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

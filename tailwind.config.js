/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Marigold — the sun over the Kenyan coast, and the "bright" in the name.
        primary: '#E4922F',
        'primary-dark': '#C2761C',
        'primary-light': '#F2B463',
        // Indian Ocean teal, a few miles from Watamu. Used sparingly.
        accent: '#1F6F6B',
        'accent-dark': '#155450',
        background: '#FBF8F3',
        surface: '#FFFFFF',
        ink: '#1C1A17',
        muted: '#6B6459',
        divider: '#E6DFD4',
        deep: '#14201F',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: { '2.5xl': '1.25rem', '4xl': '2rem', '5xl': '2.5rem', '6xl': '3rem', '7xl': '4rem' },
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

import { Link } from 'react-router-dom'

/* The shared primitives. Every page is built from these, so the spacing and
   the type scale only have to be decided once, here. Tailwind utilities
   only — nothing in this file needs a stylesheet. */

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-28 ${className}`}>
      {children}
    </section>
  )
}

export function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

export function Eyebrow({ children }) {
  return (
    <p className="mb-4 font-body text-eyebrow font-semibold uppercase text-accent-ink">
      {children}
    </p>
  )
}

export function H2({ children }) {
  return (
    <h2 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
      {children}
    </h2>
  )
}

export function Lead({ children }) {
  return (
    <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">
      {children}
    </p>
  )
}

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-body ' +
  'text-base font-semibold leading-none transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-paper'

const BUTTON_VARIANTS = {
  primary: 'bg-primary text-paper hover:bg-primary-dark',
  ghost: 'border border-primary/35 bg-transparent text-primary hover:border-primary hover:bg-primary/5',
}

export function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const classes = `${BUTTON_BASE} ${BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  )
}

export function Stat({ figure, label }) {
  return (
    <div className="border-t-2 border-accent pt-5">
      <p className="font-display text-display-sm font-semibold leading-none text-primary sm:text-display">
        {figure}
      </p>
      <p className="mt-3 font-body text-base leading-snug text-muted">{label}</p>
    </div>
  )
}

export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-divider bg-surface p-6 shadow-card sm:p-8 ${className}`}>
      {children}
    </div>
  )
}

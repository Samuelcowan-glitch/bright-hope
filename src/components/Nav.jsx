import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import asset from '../lib/asset.js'
import { Button } from './ui.jsx'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Mission', to: '/mission' },
  { label: 'Gede', to: '/gede' },
  { label: 'Sponsor a Child', to: '/sponsor' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close on Escape.
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const isCurrent = (to) => pathname === to || pathname === `${to}/`

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-container items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Bright Hope Education — home"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <img
            src={asset('/img/logo-bright-hope.png')}
            alt="Bright Hope Education"
            className="h-12 w-auto sm:h-14"
            width="220"
            height="56"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isCurrent(link.to) ? 'page' : undefined}
                  className={`rounded font-body text-[0.95rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-paper ${
                    isCurrent(link.to)
                      ? 'text-primary underline decoration-accent decoration-2 underline-offset-[7px]'
                      : 'text-ink-soft hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/sponsor" variant="primary" className="hidden px-5 py-3 text-[0.95rem] sm:inline-flex">
            Sponsor a child
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-divider text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper lg:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-divider bg-paper lg:hidden"
      >
        <nav aria-label="Main" className="px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.to} className="border-b border-divider/70 last:border-b-0">
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(link.to) ? 'page' : undefined}
                  className={`block rounded py-3.5 font-body text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                    isCurrent(link.to) ? 'text-primary' : 'text-ink-soft'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button to="/sponsor" onClick={() => setOpen(false)} variant="primary" className="mt-5 w-full sm:hidden">
            Sponsor a child
          </Button>
        </nav>
      </div>
    </header>
  )
}

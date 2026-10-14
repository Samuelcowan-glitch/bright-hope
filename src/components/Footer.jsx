import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'

/* lucide-react no longer ships brand marks, so the three social marks are
   drawn here rather than swapped for a generic icon nobody recognises. */
const TikTokMark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M15 3v11.5a3.5 3.5 0 1 1-3-3.46" />
    <path d="M15 6.5A4.5 4.5 0 0 0 19.5 11" />
  </svg>
)
const InstagramMark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const FacebookMark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const PAGES = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Mission', to: '/mission' },
  { label: 'Gede', to: '/gede' },
  { label: 'Sponsor a Child', to: '/sponsor' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
]

/* The TikTok handle is misspelt at source. It is linked exactly as it
   exists — "correcting" it would produce a dead link. */
const SOCIALS = [
  { label: 'Bright Hope Education on TikTok', href: 'https://www.tiktok.com/@brighhopeeducation', Mark: TikTokMark },
  { label: 'Rainbow House Kenya on Instagram', href: 'https://www.instagram.com/rainbowhousekenya/', Mark: InstagramMark },
  { label: "Rainbow House Children's Home on Facebook", href: 'https://www.facebook.com/RainbowHouseChildrensHome/', Mark: FacebookMark },
]

const linkClass =
  'rounded font-body text-[0.95rem] text-paper/80 transition-colors hover:text-paper ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-deep'

export default function Footer() {
  return (
    <footer className="bg-deep text-paper">
      <div className="mx-auto w-full max-w-container px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* The charity */}
          <div>
            <h2 className="font-display text-xl font-semibold leading-snug text-paper">
              Bright Hope Education
            </h2>
            <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-paper/80">
              Funding education for children in Gede, Watamu, Kilifi County, Kenya.
            </p>
          </div>

          {/* Pages */}
          <nav aria-label="Footer">
            <h2 className="font-body text-eyebrow font-semibold uppercase text-accent">Pages</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {PAGES.map((page) => (
                <li key={page.to}>
                  <Link to={page.to} className={linkClass}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in touch */}
          <div>
            <h2 className="font-body text-eyebrow font-semibold uppercase text-accent">Get in touch</h2>
            <ul className="mt-4 flex flex-col gap-4">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="font-body text-[0.95rem] leading-relaxed text-paper/80">
                  <span className="block text-paper/60">Registered address</span>
                  Priors Glade, Priorswood, Compton, Guildford, Surrey, GU3 1DR
                </span>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <Link to="/contact" className={linkClass}>Send us a message</Link>
              </li>
            </ul>
          </div>

          {/* Follow the work */}
          <div>
            <h2 className="font-body text-eyebrow font-semibold uppercase text-accent">Follow the work</h2>
            <ul className="mt-4 flex gap-3">
              {SOCIALS.map(({ label, href, Mark }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 text-paper/85 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
                  >
                    <Mark className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body text-sm leading-relaxed text-paper/70">
              Our Instagram and Facebook are run by Rainbow House Kenya, whose project this is.
            </p>
          </div>
        </div>

        {/* Baseline. The registration statement names the registered charity,
            which is Rainbow House Kenya — not Bright Hope Education. */}
        <div className="mt-14 border-t border-paper/15 pt-8">
          <p className="max-w-prose font-body text-sm leading-relaxed text-paper/75">
            Bright Hope Education is a project of Rainbow House Kenya, a charity
            registered in England and Wales, number 1111579.
          </p>
          <p className="mt-4 font-body text-sm text-paper/60">
            © Copyright 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

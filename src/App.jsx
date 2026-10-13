import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight, Menu, X, Mail, MapPin, Heart, GraduationCap, BookOpen,
  Shirt, Utensils, Stethoscope, Users, ShieldCheck, Sparkles, CheckCircle2,
  ChevronDown, HandHeart, School,
} from 'lucide-react'

/* lucide-react no longer ships brand marks, so the three we need are drawn
   here rather than replaced with a generic globe nobody recognises. */
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const TikTok = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 3v11.5a3.5 3.5 0 1 1-3-3.46" />
    <path d="M15 6.5A4.5 4.5 0 0 0 19.5 11" />
  </svg>
)

gsap.registerPlugin(ScrollTrigger)

/* ── Facts ────────────────────────────────────────────────────────────────
   Everything here comes from the charity's own site or was confirmed by
   them. Nothing about numbers, dates or outcomes is invented — where a
   figure is unknown it is left out rather than guessed at. Placeholders
   that still need the office's input are marked NEEDS_CONFIRMING. */
const ORG = {
  name: 'Bright Hope Education Project',
  short: 'Bright Hope',
  charityNo: '1111579',
  email: 'NEEDS_CONFIRMING@brighthopeeducation.com',
  address: 'NEEDS_CONFIRMING — UK registered address',
  childrenSponsored: 29,
  partner: 'Rainbow House Kenya',
  region: 'Gede and Watamu, Kilifi County',
  socials: {
    tiktok: 'https://www.tiktok.com/@brighhopeeducation',
    instagram: 'https://www.instagram.com/rainbowhousekenya',
    facebook: 'https://www.facebook.com/rainbowhousekenya',
  },
}

/* The charity's own photographs, taken in Gede and Watamu. Stock images of
   children would be dishonest on a site asking people to sponsor these
   particular children, so every photograph here is theirs. */
const PHOTOS = {
  hero: '/img/hero.jpg',
  uniform: '/img/children-1.jpg',
  older: '/img/children-2.jpg',
  logo: '/img/logo.png',
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Sponsor', href: '#sponsor' },
  { label: 'Our work', href: '#work' },
  { label: 'How it works', href: '#how' },
  { label: 'Contact', href: '#contact' },
]

const WHAT_FUNDING_COVERS = [
  { icon: GraduationCap, title: 'School fees', text: 'A term-by-term place at a local school, paid directly to the school.' },
  { icon: Shirt, title: 'Uniform and shoes', text: 'Children are turned away without them. It is the smallest barrier and the most common.' },
  { icon: BookOpen, title: 'Books and materials', text: 'Exercise books, pens and the textbooks a class is taught from.' },
  { icon: Utensils, title: 'A daily meal', text: 'A child who has not eaten cannot learn. Lunch keeps them in the room.' },
  { icon: Stethoscope, title: 'Basic healthcare', text: 'Treatment for the illnesses that otherwise take weeks out of a school year.' },
  { icon: School, title: 'Exam entry', text: 'The fees that stand between years of study and a qualification that counts.' },
]

const STEPS = [
  {
    n: '01',
    title: 'Tell us you would like to sponsor',
    text: 'A short message is enough. We will come back to you with the children currently waiting for a sponsor, their age and their school year.',
  },
  {
    n: '02',
    title: 'Choose a child and set up a monthly gift',
    text: 'You decide the amount and it goes out by standing order. You are sponsoring one named child, not a general fund.',
  },
  {
    n: '03',
    title: 'Hear how they are getting on',
    text: 'Photographs, school reports and news from Gede and Watamu, so you can see the year your sponsorship paid for.',
  },
]

/* ── Rising light: the signature animation ────────────────────────────────
   Motes of light lifting off a horizon. The reference animation falls; this
   one rises, which is the entire point of the organisation. */
function RisingLight() {
  const motes = [
    { x: 12, delay: 0, size: 5, dur: 3.6 },
    { x: 26, delay: 0.9, size: 3.5, dur: 4.2 },
    { x: 41, delay: 1.7, size: 6, dur: 3.9 },
    { x: 55, delay: 0.4, size: 4, dur: 4.5 },
    { x: 68, delay: 2.2, size: 5.5, dur: 3.4 },
    { x: 82, delay: 1.2, size: 3.5, dur: 4.1 },
    { x: 92, delay: 2.7, size: 4.5, dur: 3.8 },
  ]
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-deep">
      {/* the horizon the light lifts from */}
      <div className="absolute inset-x-6 bottom-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent horizon" />
      <div className="absolute inset-x-16 bottom-10 h-16 bg-gradient-to-t from-primary/25 to-transparent blur-xl" />

      {motes.map((m, i) => (
        <span
          key={i}
          className="mote absolute rounded-full bg-primary-light"
          style={{
            left: `${m.x}%`,
            bottom: '2.5rem',
            width: `${m.size}px`,
            height: `${m.size}px`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.dur}s`,
            boxShadow: '0 0 12px rgba(242,180,99,0.9)',
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80">
          Every sponsored child
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-white">
          One more year of school
        </p>
      </div>
    </div>
  )
}

/* ── Counting up, once, when the number scrolls into view ───────────────── */
function CountUp({ end, suffix = '', prefix = '', duration = 1800 }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.4 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let frame
    const begun = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - begun) / duration, 1)
      // Ease out, so it lands rather than stops.
      setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, end, duration])

  return <span ref={ref}>{prefix}{value}{suffix}</span>
}

/* ── 1. Navbar ─────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6 ${
            scrolled ? 'glass shadow-lg shadow-ink/5' : 'bg-transparent'
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5">
            <img src={PHOTOS.logo} alt="" className="h-10 w-10 rounded-full object-cover" />
            <span className="flex flex-col leading-none">
              <span className={`font-display text-sm font-extrabold tracking-tight ${scrolled ? 'text-ink' : 'text-white'}`}>
                Bright Hope
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${scrolled ? 'text-muted' : 'text-white/60'}`}>
                Education Project
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? 'text-ink' : 'text-white/85'}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#sponsor"
              className="magnetic-btn rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-deep shadow-lg shadow-primary/25"
            >
              Sponsor a child
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`md:hidden ${scrolled ? 'text-ink' : 'text-white'}`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-deep px-6 py-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-base font-extrabold text-white">Bright Hope</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-14 flex flex-col gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold tracking-tight text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#sponsor"
            onClick={() => setOpen(false)}
            className="mt-12 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-deep"
          >
            Sponsor a child <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </>
  )
}

/* ── 2. Hero ───────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-deep">
      <img
        src={PHOTOS.hero}
        alt="Children waving from a school window in Kilifi County, Kenya"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/45 to-deep/75" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />

      {/* light lifting in the corner — the same idea as the signature block */}
      <div className="pointer-events-none absolute right-8 top-28 hidden sm:block">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="mote absolute rounded-full bg-primary-light"
            style={{
              left: `${i * 26}px`,
              width: `${4 + (i % 3)}px`,
              height: `${4 + (i % 3)}px`,
              animationDelay: `${i * 0.7}s`,
              boxShadow: '0 0 14px rgba(242,180,99,0.85)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <p className="hero-meta mb-6 font-mono text-xs uppercase tracking-[0.25em] text-white/70">
          UK registered charity {ORG.charityNo} &middot; {ORG.region}, Kenya
        </p>
        <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tighter text-white sm:text-7xl lg:text-8xl">
          <span className="hero-line-1 block">Every child deserves</span>
          <span className="hero-line-2 block font-serif font-medium italic text-primary-light">a place in the classroom</span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          We fund school places for children in {ORG.region}. Not a general
          appeal &mdash; one sponsor, one child, one school year at a time.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a
            href="#sponsor"
            className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-deep shadow-lg shadow-primary/30"
          >
            Sponsor a child <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="magnetic-btn glass-dark inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white"
          >
            See what your money buys
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <ChevronDown className="h-5 w-5 animate-bounce text-white/40" />
      </div>
    </section>
  )
}

/* ── 3. Features ───────────────────────────────────────────────────────── */
function ChildrenWaiting() {
  const [top, setTop] = useState(0)
  const cards = [
    { name: 'A place in Year 4', meta: 'Gede &middot; aged 9' },
    { name: 'A place in Year 7', meta: 'Watamu &middot; aged 12' },
    { name: 'Secondary entry', meta: 'Gede &middot; aged 14' },
  ]
  useEffect(() => {
    const id = setInterval(() => setTop((t) => (t + 1) % cards.length), 2600)
    return () => clearInterval(id)
  }, [cards.length])

  return (
    <div className="relative h-56 w-full">
      {cards.map((c, i) => {
        const offset = (i - top + cards.length) % cards.length
        return (
          <div
            key={c.name}
            className="absolute inset-x-0 rounded-2xl border border-divider bg-surface p-5 shadow-lg shadow-ink/5 transition-all duration-700"
            style={{
              top: `${offset * 14}px`,
              transform: `scale(${1 - offset * 0.05})`,
              opacity: offset > 2 ? 0 : 1 - offset * 0.22,
              zIndex: cards.length - offset,
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Waiting for a sponsor</p>
            <p className="mt-2 font-display text-lg font-bold text-ink" dangerouslySetInnerHTML={{ __html: c.name }} />
            <p className="mt-1 text-sm text-muted" dangerouslySetInnerHTML={{ __html: c.meta }} />
          </div>
        )
      })}
    </div>
  )
}

function WhereItGoes() {
  return (
    <div className="flex h-56 flex-col justify-center gap-3">
      {[
        { label: 'Straight to the child', pct: 100 },
        { label: 'Taken in admin', pct: 0 },
      ].map((row) => (
        <div key={row.label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink">{row.label}</span>
            <span className="font-mono text-sm font-semibold text-primary">{row.pct}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-divider">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000"
              style={{ width: `${row.pct}%` }}
            />
          </div>
        </div>
      ))}
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Money given for a child is spent on that child. The charity&rsquo;s own
        running costs are met separately.
      </p>
    </div>
  )
}

function Features() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const cards = [
    { title: 'Children waiting now', text: 'Real places at real schools, waiting on a sponsor.', node: <ChildrenWaiting /> },
    {
      title: 'Uniform, books, a desk',
      text: 'The things a sponsorship actually buys.',
      node: (
        <div className="h-56 w-full overflow-hidden rounded-2xl">
          <img src={PHOTOS.uniform} alt="Children in school uniform, one holding an exercise book"
               className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105" />
        </div>
      ),
    },
    { title: 'Where the money goes', text: 'Given for a child, spent on that child.', node: <WhereItGoes /> },
  ]

  return (
    <section id="sponsor" ref={ref} className="relative bg-background px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Sponsorship</p>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Fifteen pounds a month keeps a child{' '}
          <span className="font-serif italic font-medium text-primary-dark">in school for a year</span>
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="feature-card rounded-3xl border border-divider bg-surface p-6 shadow-sm">
              {c.node}
              <h3 className="mt-6 font-display text-lg font-bold text-ink">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 4. Pillars ────────────────────────────────────────────────────────── */
function Pillars() {
  const stats = [
    { end: ORG.childrenSponsored, suffix: '', label: 'Children sponsored today', sub: 'Each one a named child at a named school' },
    { end: 100, suffix: '%', label: 'Of a child&rsquo;s gift reaches them', sub: 'Nothing taken out along the way' },
    { end: 2, suffix: '', label: 'Communities served', sub: `${ORG.region}, Kenya` },
  ]
  return (
    <section className="relative bg-deep px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-6xl font-extrabold tracking-tighter text-primary sm:text-7xl">
              <CountUp end={s.end} suffix={s.suffix} />
            </p>
            <p className="mt-3 font-display text-base font-semibold text-white" dangerouslySetInnerHTML={{ __html: s.label }} />
            <p className="mt-1 text-sm leading-relaxed text-white/50">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Photographs ───────────────────────────────────────────────────────── */
function PhotoBand() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.band-item', {
        y: 50, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-background px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Gede and Watamu</p>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              The children your sponsorship{' '}
              <span className="font-serif italic font-medium text-primary-dark">puts in a classroom</span>
            </h2>
          </div>
          <a href="#sponsor" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-deep px-5 py-3 text-sm font-semibold text-white">
            Sponsor a child <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {/* the wide one carries the section */}
          <figure className="band-item group relative overflow-hidden rounded-3xl sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <img src={PHOTOS.hero} alt="Children waving from a school window in Kilifi County"
                 className="h-72 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 lg:h-full" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-6">
              <p className="font-display text-lg font-bold text-white">Every one of them has a name</p>
              <p className="mt-1 text-sm text-white/70">Sponsorship is for a child, not a cause</p>
            </figcaption>
          </figure>

          <figure className="band-item group relative overflow-hidden rounded-3xl lg:row-span-2">
            <img src={PHOTOS.older} alt="Older children at a Bright Hope project day"
                 className="h-72 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 lg:h-full" />
          </figure>

          <figure className="band-item group relative overflow-hidden rounded-3xl">
            <img src={PHOTOS.uniform} alt="Young children in school uniform"
                 className="h-72 w-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105 lg:h-full" />
          </figure>

          {/* the signature animation, sitting among the photographs */}
          <div className="band-item overflow-hidden rounded-3xl">
            <RisingLight />
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          Photographs taken in {ORG.region}, shared with the permission of the
          families and {ORG.partner}.
        </p>
      </div>
    </section>
  )
}


/* ── 5. How it works — sticky stack ────────────────────────────────────── */
function HowItWorks() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.step-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scale: 0.92, filter: 'blur(4px)', opacity: 0.35, ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true,
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="how" ref={ref} className="relative bg-background px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">How it works</p>
        <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Three steps, and no{' '}
          <span className="font-serif italic font-medium text-primary-dark">paperwork to wade through</span>
        </h2>

        <div className="mt-16 space-y-8">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="step-card sticky top-28 rounded-4xl border border-divider bg-surface p-8 shadow-xl shadow-ink/5 sm:p-12"
            >
              <span className="font-mono text-sm font-semibold text-primary">{s.n}</span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{s.title}</h3>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 6. What the funding covers ────────────────────────────────────────── */
function WhatWeFund() {
  return (
    <section id="work" className="relative bg-deep px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">What your money buys</p>
        <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          The things that stand between a child and a{' '}
          <span className="font-serif italic font-medium text-primary-light">school desk</span>
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_FUNDING_COVERS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group bg-deep p-8 transition-colors duration-300 hover:bg-white/[0.04]">
              <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-5 font-display text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 7. Trust signals ──────────────────────────────────────────────────── */
function TrustSignals() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-item', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const items = [
    { icon: ShieldCheck, title: 'UK registered charity', text: `Registered with the Charity Commission for England and Wales, number ${ORG.charityNo}.` },
    { icon: HandHeart, title: 'Given for a child, spent on that child', text: 'Sponsorship money is not pooled into general funds or absorbed by overheads.' },
    { icon: Users, title: `Working with ${ORG.partner}`, text: `Delivered on the ground in ${ORG.region} by people who know the families.` },
  ]

  return (
    <section ref={ref} className="bg-background px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="trust-item rounded-3xl border border-divider bg-surface p-8">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary-dark" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── 8. Contact / sponsor enquiry ──────────────────────────────────────── */
function ContactForm() {
  const [status, setStatus] = useState('idle')
  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Not wired to a mail service yet — see the note in the README the office
    // was given. The state machine is real so the form can be connected later.
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-deep px-6 py-24 sm:px-10 lg:px-16">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Get in touch</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Start sponsoring{' '}
            <span className="font-serif italic font-medium text-primary-light">a child</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-white/60">
            Tell us a little about yourself and we will come back to you with the
            children currently waiting, and what a monthly gift would cover.
          </p>

          <div className="mt-10 space-y-4">
            <a href={`mailto:${ORG.email}`} className="flex items-center gap-3 text-white/80 transition-colors hover:text-primary">
              <Mail className="h-4 w-4 text-primary" /> {ORG.email}
            </a>
            <p className="flex items-start gap-3 text-white/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {ORG.address}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <a href={ORG.socials.instagram} target="_blank" rel="noreferrer"
               className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:text-primary">
              <Instagram className="h-4 w-4" aria-label="Instagram" />
            </a>
            <a href={ORG.socials.facebook} target="_blank" rel="noreferrer"
               className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:text-primary">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={ORG.socials.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"
               className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:text-primary">
              <TikTok className="h-4 w-4" />
            </a>
          </div>
        </div>

        {status === 'sent' ? (
          <div className="flex flex-col items-center justify-center rounded-4xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <h3 className="mt-5 font-display text-2xl font-bold text-white">Thank you</h3>
            <p className="mt-2 max-w-sm text-white/60">
              We have your message and will come back to you shortly with the
              children currently waiting for a sponsor.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-4xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { name: 'name', label: 'Your name', type: 'text', required: true },
                { name: 'email', label: 'Email address', type: 'email', required: true },
                { name: 'phone', label: 'Telephone (optional)', type: 'tel', required: false },
                { name: 'amount', label: 'Monthly amount you have in mind', type: 'text', required: false },
              ].map((f) => (
                <label key={f.name} className={f.name === 'amount' ? 'sm:col-span-2' : ''}>
                  <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
                    {f.label}
                  </span>
                  <input
                    type={f.type}
                    name={f.name}
                    required={f.required}
                    className="w-full rounded-xl border border-white/10 bg-deep/60 px-4 py-3 text-white placeholder-white/25 outline-none transition-colors focus:border-primary"
                  />
                </label>
              ))}
              <label className="sm:col-span-2">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
                  Anything you would like to ask
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-deep/60 px-4 py-3 text-white placeholder-white/25 outline-none transition-colors focus:border-primary"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="magnetic-btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-deep disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
              {status !== 'sending' && <ArrowUpRight className="h-4 w-4" />}
            </button>
            <p className="mt-4 text-center text-xs text-white/40">
              We will only use your details to reply to you.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

/* ── 9. Footer ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={PHOTOS.logo} alt="" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-base font-extrabold text-white">{ORG.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Funding access to education for children in {ORG.region}, Kenya,
              in partnership with {ORG.partner}.
            </p>
            <p className="mt-5 flex items-center gap-2 text-xs text-white/40">
              <span className="h-2 w-2 rounded-full bg-primary ring-pulse" />
              {ORG.childrenSponsored} children sponsored today
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/65 transition-colors hover:text-primary">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Follow</p>
            <ul className="mt-4 space-y-2.5">
              <li><a href={ORG.socials.instagram} target="_blank" rel="noreferrer" className="text-sm text-white/65 hover:text-primary">Instagram</a></li>
              <li><a href={ORG.socials.facebook} target="_blank" rel="noreferrer" className="text-sm text-white/65 hover:text-primary">Facebook</a></li>
              <li><a href={ORG.socials.tiktok} target="_blank" rel="noreferrer" className="text-sm text-white/65 hover:text-primary">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {ORG.name}. Registered charity in
            England and Wales no. <span className="text-white/70">{ORG.charityNo}</span>.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-white/45 transition-colors hover:text-primary">Privacy</Link>
            <Link to="/terms" className="text-xs text-white/45 transition-colors hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <PhotoBand />
        <HowItWorks />
        <WhatWeFund />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

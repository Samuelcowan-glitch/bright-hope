import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  School,
  ShieldCheck,
} from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button, Stat, Card } from '../components/ui.jsx'

/* ──────────────────────────────────────────────────────────────────────────
   THE FORM ENDPOINT — the one line the office needs to change.

   The site is a static build with no server of its own, so the enquiry form
   posts straight to a third-party form service. Create the form at
   formspree.io, copy the endpoint it gives you ("https://formspree.io/f/" plus
   your form id) and paste it below. Nothing else on this page needs touching.

   Until it is replaced the form still validates and still submits; it simply
   reaches a form id that does not exist, which is why the fallback line
   beneath the button tells people how to email instead.
   ────────────────────────────────────────────────────────────────────────── */
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_FORM_ID'

/* The reply-to address used by the "email us directly" fallback. The domain is
   the charity's own; CONFIRM THE MAILBOX NAME WITH THE OFFICE before launch
   and correct it here if it is anything other than info@. */
const CONTACT_EMAIL = 'info@brighthopeeducation.com'
const CONTACT_PHONE = '07551909493'

/* The three sponsorship stages, in the form's own words so that the email
   which lands in the office inbox reads as a sentence. */
const TYPE_PRIMARY = 'Sponsor a primary school child (£15 a month)'
const TYPE_SECONDARY = 'Sponsor a secondary school child (£35 a month)'
const TYPE_VOCATIONAL = 'Sponsor a child in vocational or higher education'
const TYPE_OTHER = 'Other'

const SPONSORSHIP_TYPES = [TYPE_PRIMARY, TYPE_SECONDARY, TYPE_VOCATIONAL, TYPE_OTHER]

const REASONS = [
  'Sponsor a child',
  'General question about your organisation',
  'My church, school or company would like to help',
  'Other',
]

/* A link may arrive as /sponsor?place=secondary from elsewhere on the site.
   Known values name the stage and preselect it; anything else is shown back
   to the visitor as a reference so the office can match it up. */
const PLACES = {
  primary: { label: 'a primary school place', type: TYPE_PRIMARY },
  secondary: { label: 'a secondary school place', type: TYPE_SECONDARY },
  vocational: { label: 'a vocational or higher education place', type: TYPE_VOCATIONAL },
  higher: { label: 'a higher education place', type: TYPE_VOCATIONAL },
}

function readPlace(raw) {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  if (PLACES[key]) return { ...PLACES[key], reference: null }
  const reference = raw.trim().replace(/[^A-Za-z0-9 –-]/g, '').slice(0, 40)
  if (!reference) return null
  return { label: null, type: TYPE_OTHER, reference }
}

const PACKAGES = [
  {
    id: 'primary',
    stage: 'Primary school',
    price: '£15 a month',
    year: '£180 a year',
    Icon: School,
    body: [
      'Primary school is where a family either manages the costs or does not. A term’s fees can exceed a month’s income, and a child who cannot bring the fee cannot bring the exercise books either.',
      'For £15 a month a child has the things a classroom quietly assumes you own, and a school place that is paid for before the term starts rather than argued about halfway through it.',
    ],
    covers: [
      'School fees',
      'Uniform and shoes',
      'Books and materials',
      'A daily meal',
      'Basic healthcare',
      'Exam entry',
    ],
    cta: 'Sponsor a primary school child',
    place: 'primary',
  },
  {
    id: 'secondary',
    stage: 'Secondary school',
    price: '£35 a month',
    year: '£420 a year',
    Icon: BookOpen,
    body: [
      'Secondary school costs more and matters enormously, because this is where the Kenyan national exams decide what a young person can do next.',
      'Some of our students travel to school in Watamu, which is why £35 covers more than £15 does. Distance is not a detail here; it is the difference between sitting an exam and not sitting it.',
    ],
    covers: [
      'School fees',
      'Uniform and shoes',
      'Books and materials',
      'A daily meal',
      'Basic healthcare',
      'Exam entry',
      'Travel to and from school',
    ],
    cta: 'Sponsor a secondary school child',
    place: 'secondary',
  },
  {
    id: 'vocational',
    stage: 'Vocational and higher education',
    price: 'By arrangement',
    year: 'No fixed monthly figure',
    Icon: GraduationCap,
    body: [
      'Some of our students reach the end of secondary school and are ready for more: a trade, a college course, teacher training, university.',
      'We do not advertise a monthly price for this, because a welding course and a degree do not cost the same thing. If this is the part you would like to fund, tell us. We will come back with a real student, a real course and a real figure, and you can decide.',
    ],
    covers: [
      'Tell us which stage interests you',
      'We come back with a real student and a real course',
      'We tell you what that student needs for the year',
      'You decide, and set the amount with us',
    ],
    coversHeading: 'How it is agreed',
    cta: 'Ask about vocational and higher education',
    place: 'vocational',
  },
]

const STEPS = [
  {
    title: 'You send us a message',
    body: 'Choose the stage you are interested in on the form at the foot of this page. It takes a minute.',
    Icon: MessageSquare,
  },
  {
    title: 'We talk',
    body: 'By email or telephone, whichever you prefer. We will tell you about a child or student who is waiting, what their school costs, and what the next school year looks like for them.',
    Icon: Phone,
  },
  {
    title: 'We send you the standing order details',
    body: 'You set it up from your own bank, so you stay in control of it: £15 a month, £35 a month, or an agreed amount for a vocational or higher education student.',
    Icon: FileText,
  },
  {
    title: 'Letters and cards come back',
    body: 'Written by the child, passed on by us, during the school year.',
    Icon: Mail,
  },
  {
    title: 'We tell you when things change',
    body: 'A move of school, a family circumstance, the end of a school stage. Good news and difficult news both.',
    Icon: RefreshCw,
  },
]

const FAQS = [
  {
    q: 'How much of my £15 or £35 reaches the child?',
    a: 'All of it. All funding for the children goes directly for the children.',
  },
  {
    q: 'Can I send a gift or a letter?',
    a: 'Yes, through us. We pass letters and cards on. Please do not send money to a child or family directly — it puts them in a difficult position and we cannot account for it.',
  },
  {
    q: 'Can I choose a child?',
    a: 'You can tell us the stage you want to support — primary, secondary, or vocational and higher education. We will then tell you who is waiting, and why, before anything is set up.',
  },
  {
    q: 'What if I have to stop?',
    a: 'Tell us, and we will look for another sponsor for that child. No one is asked to explain themselves. We would rather you told us early than quietly stopped.',
  },
  {
    q: 'Can I visit?',
    a: 'Talk to us first. Visits are possible but they are arranged around the children’s safety and the school term, never the other way round.',
  },
  {
    q: 'Why are there no photographs of named children on this site?',
    a: 'Because the children are children, and they live with their families or with foster parents. We do not publish a photograph next to a name. What you will see on this site is the place: classrooms, books, growing beds, the road into Gede.',
  },
  {
    q: 'Can my church, school or company support a child?',
    a: 'Yes. A classroom, a small group or a team can share a £15 or £35 sponsorship between them. Get in touch and we will set it up.',
  },
  {
    q: 'Do I have to be Christian to sponsor a child?',
    a: 'No. This is Christian work and we are open about it, but sponsors of any faith or none are welcome, and children are supported on the basis of need.',
  },
]

/* Quoted as our sponsors wrote them. No star graphics: we do not run a rating
   system and will not import one onto a charity page. */
const TESTIMONIALS = [
  {
    name: 'Sue',
    quote:
      'I like knowing my money goes directly to educate my sponsored child. They are a small charity that you can trust to know your money is used well',
  },
  { name: 'Jeanie', quote: 'Thank you for the letter from Agnes, it is wonderful to hear from her' },
  {
    name: 'Karen',
    quote:
      'Thank you so much for telling me about Joseph & his family, I don’t know how to say thank you enough for all that you do',
  },
  { name: 'Lynda', quote: 'I received John’s Card and letter, it was beautiful, Thank you' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const labelClass = 'block font-body text-base font-semibold text-ink'
const helpClass = 'mt-1 font-body text-sm text-muted'
const fieldClass =
  'mt-2 w-full rounded-xl border border-divider bg-surface px-4 py-3 font-body text-base ' +
  'text-ink placeholder:text-muted-light focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper'
const errorClass = 'mt-2 font-body text-sm font-semibold text-primary-dark'

export default function Sponsor() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const place = useMemo(() => readPlace(params.get('place')), [params])

  const [reason, setReason] = useState('Sponsor a child')
  const [type, setType] = useState(place ? place.type : TYPE_PRIMARY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)

  function validate(form) {
    const data = new FormData(form)
    const next = {}
    const first = String(data.get('first-name') || '').trim()
    const last = String(data.get('last-name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!first || !last) next.name = 'Please tell us your name.'
    if (!EMAIL_PATTERN.test(email)) next.email = 'We need a working email address to reply to you.'
    if (!data.get('reason')) next.reason = 'Please choose a reason, so your message reaches the right person.'
    if (!message) next.message = 'Please add a line or two about what you would like to ask.'
    if (!data.get('consent')) next.consent = 'Please tick the box so we know we may reply to you.'
    return next
  }

  /* Posted with fetch rather than left to the browser, so that a successful
     send lands on our own /thank-you page — which tells people what happens
     next — instead of the form provider's confirmation screen. */
  async function handleSubmit(event) {
    event.preventDefault()
    setSendFailed(false)

    const form = event.currentTarget
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0]
      const target = document.getElementById(`field-${firstKey}`)
      if (target) target.focus()
      return
    }

    setSending(true)
    try {
      const data = new FormData(form)
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(data.entries()),
          consent: 'Consent given',
          consentGivenAt: new Date().toISOString(),
        }),
      })
      if (!response.ok) throw new Error('The form provider rejected the message.')
      navigate('/thank-you')
    } catch {
      setSendFailed(true)
      setSending(false)
    }
  }

  return (
    <Layout>
      <SEO
        title="Sponsor a child in Kenya | £15 primary, £35 secondary | Bright Hope Education Project"
        description="Sponsor a child's schooling in Gede and Watamu, Kenya. £15 a month for primary, £35 for secondary, and vocational or higher education by arrangement. Letters and cards come back to you."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section className="bg-sand-light pt-12 sm:pt-16 lg:pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Eyebrow>Gede and Watamu · Kilifi County · Kenya</Eyebrow>
              <h1 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
                Sponsor a child’s education in Gede
              </h1>
              <Lead>
                £15 a month pays for a primary school place. £35 a month pays for a secondary school
                place. Vocational and higher education is arranged student by student, because the
                courses do not cost the same thing.
              </Lead>
              <p className="mt-5 max-w-prose font-body text-base leading-relaxed text-ink-soft">
                There is no card payment button on this website. Sponsorship starts with the form at
                the foot of this page and continues as a standing order from your own bank, which is
                why all funding for the children goes directly for the children.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#enquire" variant="primary">
                  Sponsor a primary school child
                </Button>
                <Button href="#packages" variant="ghost">
                  See what £15 and £35 cover
                </Button>
              </div>
            </div>
            <div>
              <img
                src={asset('/img/gede-01.jpg')}
                alt="Children in blue T-shirts gathered under a corrugated-iron shelter in Gede, Kilifi County, Kenya."
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
                loading="eager"
              />
              <p className="mt-3 font-body text-sm text-muted">
                Gede, Kilifi County — photographed by Rainbow House Kenya.
              </p>
            </div>
          </div>

          {place ? (
            <div
              className="mt-12 rounded-2xl border border-accent-dark/40 bg-surface p-6 shadow-card"
              aria-live="polite"
            >
              <p className="font-display text-xl font-semibold text-primary">
                {place.label
                  ? `You are enquiring about ${place.label}.`
                  : 'You are enquiring about a particular place.'}
              </p>
              <p className="mt-2 font-body text-base leading-relaxed text-ink-soft">
                {place.reference ? (
                  <>
                    We have carried the reference <strong className="text-ink">{place.reference}</strong>{' '}
                    through to the form, so the office knows which place you mean. The sponsorship
                    type is set to <strong className="text-ink">Other</strong> — change it if you
                    know the stage you want.
                  </>
                ) : (
                  <>
                    The form at the foot of this page is already set to that stage. Change it if you
                    would rather ask about a different one.
                  </>
                )}
              </p>
              <p className="mt-4">
                <a
                  href="#enquire"
                  className="font-body text-base font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  Go to the enquiry form
                </a>
              </p>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* ── The numbers ──────────────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            <Stat figure="29" label="Children sponsored, as at October 2026" />
            <Stat figure="100%" label="All funding for the children goes directly for the children" />
            <Stat figure="£15 · £35" label="A month, for a primary or a secondary school place" />
          </div>
        </Container>
      </Section>

      {/* ── The packages ─────────────────────────────────────────────────── */}
      <Section id="packages" className="bg-sand-light">
        <Container>
          <Eyebrow>Three stages</Eyebrow>
          <H2>Our sponsor packages</H2>
          <Lead>
            By funding all three stages of education in Kenya we aim to support a whole school
            career rather than a single year of one. Each package pays for the same basket of
            things; what changes is the stage, and what that stage costs.
          </Lead>

          <div className="mt-12 space-y-10">
            {PACKAGES.map(({ id, stage, price, year, Icon, body, covers, coversHeading, cta, place: placeKey }) => (
              <Card key={id}>
                <div id={id} className="grid scroll-mt-24 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary/10">
                        <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                          {stage}
                        </h3>
                        <p className="font-body text-base font-semibold text-accent-ink">
                          {price} · {year}
                        </p>
                      </div>
                    </div>
                    {body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 28)}
                        className="mt-5 max-w-prose font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                    <div className="mt-7">
                      <Button
                        href="#enquire"
                        variant="primary"
                        onClick={() => {
                          setReason('Sponsor a child')
                          setType(PLACES[placeKey].type)
                        }}
                      >
                        {cta}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-sand-light p-6">
                    <h4 className="font-body text-eyebrow font-semibold uppercase text-accent-ink">
                      {coversHeading || 'What it covers'}
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {covers.map((item) => (
                        <li key={item} className="flex gap-3 font-body text-base leading-snug text-ink-soft">
                          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-growth" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-10 max-w-prose font-body text-base leading-relaxed text-ink-soft">
            Sponsorship funding covers school fees, uniform and shoes, books and materials, a daily
            meal, basic healthcare and exam entry. We do not take a cut. If a child leaves school or
            a sponsorship ends partway through a term, the money already given stays with that
            child’s education until the term is paid for, and anything left is used for the next
            child waiting for a place.
          </p>
        </Container>
      </Section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <Eyebrow>Five steps</Eyebrow>
          <H2>How it works, step by step</H2>
          <Lead>
            Sponsorship here begins with a conversation, because a sponsor is funding a child’s
            schooling over school years rather than months. We ask people to think in school years.
          </Lead>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map(({ title, body, Icon }, index) => (
              <li key={title}>
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-growth text-paper">
                      <span className="font-display text-lg font-semibold">{index + 1}</span>
                    </span>
                    <Icon aria-hidden="true" className="h-5 w-5 text-accent-ink" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-primary">{title}</h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">{body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── What you receive ─────────────────────────────────────────────── */}
      <Section className="bg-sand">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>What comes back</Eyebrow>
              <H2>What you receive</H2>
              <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
                Letters, in the child’s own handwriting, and cards. We pass them on as they are
                written. That is the proof that a term’s fees turned into a term at school.
              </p>
              <p className="mt-5 max-w-prose font-body text-base leading-relaxed text-ink-soft">
                We will also tell you when something changes — a move of school, a family
                circumstance, the end of a school stage. You hear it from us rather than reading it
                later. We do not promise school reports, exam certificates or photographs, because
                we would rather under-promise and send you a letter than over-promise and send you
                an apology.
              </p>
              <p className="mt-5 max-w-prose font-body text-base leading-relaxed text-ink-soft">
                Letters and cards pass through the office before they are sent on, and there is no
                direct contact between a sponsor and a child outside the charity. That is a
                safeguarding rule, not an administrative one.
              </p>
            </div>
            <Card>
              <h3 className="font-display text-xl font-semibold text-primary">
                What we will not send you
              </h3>
              <ul className="mt-4 space-y-3 font-body text-base leading-relaxed text-ink-soft">
                <li className="flex gap-3">
                  <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-growth" />
                  <span>A photograph of a child published beside their name, here or anywhere.</span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-growth" />
                  <span>A child’s address, school name or location.</span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-growth" />
                  <span>
                    A promise of school reports or exam certificates. Letters and cards are what we
                    can reliably pass on, so letters and cards are what we promise.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ── Long-term sponsorship ────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>School years, not months</Eyebrow>
              <H2>Long-term sponsorship</H2>
              <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
                Long-term sponsorship is particularly valuable because it enables us to maximise our
                impact throughout an educational journey and embed our long-term goal for community
                resilience.
              </p>
              <p className="mt-5 max-w-prose font-body text-base leading-relaxed text-ink-soft">
                A child whose fees are covered next year can be planned for. So can a school, and so
                can a family deciding which of their children can stay in education. That is the
                practical difference between a gift and a sponsorship.
              </p>
              <p className="mt-5 max-w-prose font-body text-base leading-relaxed text-ink-soft">
                We ask people to think in school years rather than months — and if you ever have to
                stop, tell us and we will look for another sponsor for that child. No one is asked to
                explain themselves.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#enquire" variant="primary">
                  Ask about sponsoring a child
                </Button>
                <Button to="/gede" variant="ghost">
                  See the work in Gede
                </Button>
              </div>
            </div>
            <div className="grid gap-6">
              <figure>
                <img
                  src={asset('/img/sponsors-01.jpg')}
                  alt="Four young children in maroon-checked school uniform standing outside a house in Gede, one holding an exercise book."
                  className="aspect-[3/2] w-full rounded-2xl object-cover shadow-card"
                  loading="lazy"
                />
                <figcaption className="mt-3 font-body text-sm text-muted">
                  Photograph supplied by Rainbow House Kenya. No child on this site is
                  named beside a photograph.
                </figcaption>
              </figure>
              <Card>
                <h3 className="font-display text-xl font-semibold text-primary">
                  Where the schooling sits
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                  The children we support live with their families or with foster parents. What was
                  the Rainbow House children’s home is now held in trust as ABBAFATHERLAND and runs
                  as a community hub, with a library, an education resource centre and hydroponics on
                  the land. We pay for school places, not beds.
                </p>
                <p className="mt-4">
                  <Link
                    to="/gede"
                    className="font-body text-base font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    Read about Gede and ABBAFATHERLAND
                  </Link>
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Sponsors' own words ──────────────────────────────────────────── */}
      <Section className="bg-sand-light">
        <Container>
          <Eyebrow>Four sponsors</Eyebrow>
          <H2>In our sponsors’ own words</H2>
          <Lead>Quoted as our sponsors wrote them.</Lead>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map(({ name, quote }) => (
              <li key={name}>
                <Card className="h-full">
                  <blockquote className="font-body text-lg leading-relaxed text-ink-soft">
                    “{quote}”
                  </blockquote>
                  <p className="mt-5 font-body text-base font-semibold text-primary">{name}</p>
                </Card>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-prose font-body text-base leading-relaxed text-muted">
            Agnes, Joseph and John are named here only because the sponsors who wrote to us named
            them. We do not publish a child’s photograph beside a child’s name.
          </p>
        </Container>
      </Section>

      {/* ── Questions ────────────────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <Eyebrow>Before you get in touch</Eyebrow>
          <H2>Questions about sponsoring</H2>
          <dl className="mt-12 divide-y divide-divider border-y border-divider">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="py-7 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
                <dt className="font-display text-xl font-semibold text-primary">{q}</dt>
                <dd className="mt-3 max-w-prose font-body text-base leading-relaxed text-ink-soft lg:mt-0 sm:text-lg sm:leading-relaxed">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ── The enquiry form ─────────────────────────────────────────────── */}
      <Section id="enquire" className="scroll-mt-20 bg-sand">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow>Begin here</Eyebrow>
              <H2>Please fill out the form below to begin sponsoring a child</H2>
              <Lead>
                If you are interested in sponsoring a child, fill out the form and we will be in
                touch. We read all of it, and we reply to every enquiry.
              </Lead>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-10 space-y-7"
                aria-describedby="form-intro"
              >
                <p id="form-intro" className="sr-only">
                  All fields are required except the telephone number.
                </p>

                {/* Carried through so the office can see which page and which
                    place the enquiry came from. */}
                <input type="hidden" name="_subject" value="Sponsorship enquiry — brighthopeeducation.com" />
                <input type="hidden" name="Enquiry page" value="/sponsor" />
                {place ? (
                  <input
                    type="hidden"
                    name="Place enquired about"
                    value={place.reference || place.label || ''}
                  />
                ) : null}

                <fieldset>
                  <legend className={labelClass}>Your name</legend>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="field-name" className={helpClass}>
                        First
                      </label>
                      <input
                        id="field-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        required
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="field-last-name" className={helpClass}>
                        Last
                      </label>
                      <input
                        id="field-last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        required
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  {errors.name ? (
                    <p id="error-name" role="alert" className={errorClass}>
                      {errors.name}
                    </p>
                  ) : null}
                </fieldset>

                <div>
                  <label htmlFor="field-email" className={labelClass}>
                    Your email
                  </label>
                  <p className={helpClass}>So we can reply</p>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={fieldClass}
                  />
                  {errors.email ? (
                    <p id="error-email" role="alert" className={errorClass}>
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="field-phone" className={labelClass}>
                    Telephone (optional)
                  </label>
                  <p className={helpClass}>Only if you would rather we rang</p>
                  <input
                    id="field-phone"
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="field-reason" className={labelClass}>
                    The reason for your email
                  </label>
                  <select
                    id="field-reason"
                    name="reason"
                    required
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    aria-invalid={errors.reason ? 'true' : undefined}
                    aria-describedby={errors.reason ? 'error-reason' : undefined}
                    className={fieldClass}
                  >
                    {REASONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.reason ? (
                    <p id="error-reason" role="alert" className={errorClass}>
                      {errors.reason}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="field-type" className={labelClass}>
                    Sponsorship type
                  </label>
                  <p className={helpClass}>
                    {place && place.label
                      ? `Set to match ${place.label}. Change it if you would rather ask about a different stage.`
                      : 'Which stage of school you are thinking about'}
                  </p>
                  <select
                    id="field-type"
                    name="sponsorship-type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    className={fieldClass}
                  >
                    {SPONSORSHIP_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="field-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="field-message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us about the child sponsorship you’re interested in"
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    className={fieldClass}
                  />
                  {errors.message ? (
                    <p id="error-message" role="alert" className={errorClass}>
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="flex gap-3">
                    <input
                      id="field-consent"
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={errors.consent ? 'true' : undefined}
                      aria-describedby={errors.consent ? 'error-consent' : 'consent-note'}
                      className="mt-1 h-5 w-5 flex-none rounded border-divider text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    />
                    <label htmlFor="field-consent" className="font-body text-base leading-relaxed text-ink-soft">
                      I consent to be contacted to begin a dialogue to sponsor a child for
                      educational purposes.
                    </label>
                  </div>
                  {errors.consent ? (
                    <p id="error-consent" role="alert" className={errorClass}>
                      {errors.consent}
                    </p>
                  ) : null}
                  <p id="consent-note" className="mt-3 font-body text-sm leading-relaxed text-muted">
                    We use your details only to reply to you, and to arrange a child sponsorship if
                    that is what you have asked about. Your message is handled by a third-party form
                    provider and reaches our email inbox. We do not sell or share your details.{' '}
                    <Link
                      to="/privacy-policy"
                      className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      Read our privacy policy
                    </Link>
                    .
                  </p>
                </div>

                {sendFailed ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-primary/30 bg-primary/5 p-4 font-body text-base leading-relaxed text-ink"
                  >
                    Something went wrong at our end. Please email us at{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20enquiry`}
                      className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {CONTACT_EMAIL}
                    </a>{' '}
                    or ring{' '}
                    <a
                      href={`tel:${CONTACT_PHONE}`}
                      className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {CONTACT_PHONE}
                    </a>{' '}
                    instead — your message has not been lost, but it has not reached us either.
                  </p>
                ) : null}

                <div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-body text-base font-semibold leading-none text-ink transition-colors duration-200 hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-70"
                  >
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                    If the form will not send, email us directly at{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20enquiry`}
                      className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      {CONTACT_EMAIL}
                    </a>{' '}
                    and we will pick it up. Something going wrong at our end does not lose your
                    message, but it does not deliver it either.
                  </p>
                </div>
              </form>
            </div>

            {/* ── Alongside the form ──────────────────────────────────── */}
            <div className="space-y-6">
              <Card>
                <h3 className="font-display text-2xl font-semibold text-primary">
                  Prefer to speak to someone?
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    {CONTACT_PHONE}
                  </a>
                </p>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">Registered address</span>
                  <br />
                  Priors Glade, Priorswood, Compton, Guildford, Surrey, GU3 1DR
                </p>
                <p className="mt-4 font-body text-base leading-relaxed text-muted">
                  We are a small team, so give us a couple of days.
                </p>
              </Card>

              <Card>
                <h3 className="font-display text-2xl font-semibold text-primary">
                  What happens after you send it
                </h3>
                <ol className="mt-4 space-y-3 font-body text-base leading-relaxed text-ink-soft">
                  <li className="flex gap-3">
                    <MessageSquare aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-growth" />
                    <span>We reply and ask anything we need to know.</span>
                  </li>
                  <li className="flex gap-3">
                    <School aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-growth" />
                    <span>
                      We tell you about a child or student who is waiting — their stage of school,
                      and what the year costs.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <FileText aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-growth" />
                    <span>
                      If you are happy, we send you the details to set up a standing order from your
                      own bank.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Mail aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-growth" />
                    <span>Letters and cards start coming back during the school year.</span>
                  </li>
                </ol>
              </Card>

              <Card>
                <h3 className="font-display text-2xl font-semibold text-primary">
                  Who you are sending it to
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
                  Bright Hope Education Project is a project of Rainbow House Kenya, a
                  charity registered in England and Wales, number 1111579.
                </p>
                <p className="mt-4 font-body text-base leading-relaxed text-muted">
                  If something about your enquiry is not handled as it should be, tell us: ring
                  {' '}{CONTACT_PHONE} or write to the registered address above, and it goes to the
                  trustees.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

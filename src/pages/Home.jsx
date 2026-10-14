import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BookOpen,
  GraduationCap,
  School,
  Shirt,
  Utensils,
} from 'lucide-react'

import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button, Stat, Card } from '../components/ui.jsx'

gsap.registerPlugin(ScrollTrigger)

/* How the relationship is stated wherever it comes up. The charity number
   itself appears only in the footer. */
const PROJECT_OF = 'Bright Hope Education is a project of Rainbow House Kenya.'

/* The verified basket. Both stages are funded the same way; only the monthly
   figure differs, so the two cards list the same six things. */
const COVERED = [
  { Icon: School, label: 'School fees' },
  { Icon: Shirt, label: 'Uniform and shoes' },
  { Icon: BookOpen, label: 'Books and materials' },
  { Icon: Utensils, label: 'A daily meal' },
  { Icon: GraduationCap, label: 'Exam entry' },
]

const STEPS = [
  {
    title: 'You send us a message',
    body: 'Tell us whether you are thinking of primary, secondary, or vocational and higher education. The form takes a minute.',
  },
  {
    title: 'We talk',
    body: 'By email or telephone, whichever you prefer. We will tell you about a child who does not yet have a sponsor, what their school costs, and what the next school year looks like for them.',
  },
  {
    title: 'We send you the standing order details',
    body: 'You set it up from your own bank — £15 a month, £35 a month, or an agreed amount for a vocational or higher education student. You stay in control of it.',
  },
  {
    title: 'Letters and cards come back',
    body: 'Written by the child and passed on by us, during the school year.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sue',
    quote:
      'I like knowing my money goes directly to educate my sponsored child. They are a small charity that you can trust to know your money is used well',
  },
  {
    name: 'Jeanie',
    quote: 'Thank you for the letter from [name], it is wonderful to hear from her',
  },
  {
    name: 'Karen',
    quote:
      "Thank you so much for telling me about [name] & his family, I don't know how to say thank you enough for all that you do",
  },
  {
    name: 'Lynda',
    quote: "I received [name]'s Card and letter, it was beautiful, Thank you",
  },
]

const FAQS = [
  {
    question: 'Is there a card payment option?',
    answer:
      'Not at the moment. Every sponsorship here starts with the enquiry form and continues as a standing order from your own bank. There is no payment processor in between, which is why 100% of sponsorship money goes directly to the sponsored child.',
  },
  {
    question: 'Can I choose a child?',
    answer:
      'You can tell us the stage you want to support — primary, secondary, or vocational and higher education. We will then tell you about a child or student at that stage who does not yet have a sponsor, before anything is set up.',
  },
  {
    question: 'Do I have to be Christian to sponsor a child?',
    answer:
      'No. This is Christian work and we are open about it, but sponsors of any faith or none are welcome, and children are supported on the basis of need.',
  },
  {
    question: 'What if I have to stop?',
    answer:
      'Tell us, and we will look for another sponsor for that child. No one is asked to explain themselves. We would rather you told us early than quietly stopped.',
  },
  {
    question: 'Where does my money actually go?',
    answer:
      'School fees, uniform and shoes, books and materials, a daily meal, exam entry and, for secondary students, the bus to school. 100% of sponsorship money goes directly to the sponsored child. Sponsorship does not cover basic health care.',
  },
]

export default function Home() {
  const statsRef = useRef(null)

  /* The three figures fade up one at a time as they come into view. They are
     present in the markup and GSAP only animates from a hidden state, so if
     the script never runs — or the visitor has asked for reduced motion —
     they are simply there. */
  useEffect(() => {
    const root = statsRef.current
    if (!root) return undefined

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.from('[data-stat]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
        stagger: { each: 0.12 },
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <Layout>
      <SEO
        title="Bright Hope Education | Sponsoring children's education in Gede, Watamu, Kenya"
        description="Funding school places for 44 students from 33 families in Gede, Watamu, Kilifi County, Kenya. 100% of sponsorship goes to the sponsored child."
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <Section className="bg-sand-light pt-10 sm:pt-14 lg:pt-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Eyebrow>Gede, Watamu · Kilifi County · Kenya</Eyebrow>

              <h1 className="max-w-prose font-display text-display font-semibold leading-[1.08] tracking-tight text-primary sm:text-display-lg lg:text-display-xl">
                Forty-four students in school
              </h1>

              <Lead>
                Bright Hope Education funds school places for children in Gede, Watamu, on
                the Kenyan coast. {PROJECT_OF}
              </Lead>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to="/sponsor">Sponsor a child</Button>
                <Button to="/gede" variant="ghost">
                  See the work in Gede
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <figure className="m-0">
                <img
                  src={asset('/img/sponsors-01.jpg')}
                  alt="Four young children in Kilifi County, one of them holding an exercise book."
                  width="1556"
                  height="1600"
                  className="aspect-[4/5] w-full rounded-4xl object-cover shadow-card sm:aspect-[5/4] lg:aspect-[4/5]"
                />
                <figcaption className="mt-3 font-body text-sm text-muted">
                  Photograph supplied by Rainbow House Kenya.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The three numbers ─────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <H2>Small charity, short distance</H2>

          <div ref={statsRef} className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div data-stat>
              <Stat figure="44" label="Students sponsored, from 33 families, as at October 2026" />
            </div>
            <div data-stat>
              <Stat
                figure="100%"
                label="Of sponsorship money goes directly to your sponsored child"
              />
            </div>
            <div data-stat>
              <Stat figure="£15 – £35" label="A month, depending on the stage of school" />
            </div>
          </div>

          <p className="mt-10 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
            There is no card payment on this website and no payment processor, so nothing is taken
            out of a gift on the way to a school in Kilifi County. Sponsorship starts with a message
            and continues as a standing order from your own bank.
          </p>

          <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
            The charity does have running costs of its own: the site, security and maintenance
            come to about £400 a month. None of that is taken from sponsorship.
          </p>
        </Container>
      </Section>

      {/* ── Why education ─────────────────────────────────────────────── */}
      <Section className="bg-sand">
        <Container>
          <div className="max-w-prose">
            <H2>Why we put the money into school fees</H2>

            <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
              Across Gede, Watamu, there are children out of the classroom who have every bit of
              the ability to be in it. What stands in the way is the cost of a school place: fees,
              uniform, shoes, textbooks, exam entry, and the bus to secondary school, whether that is in Watamu, Kilifi, Malindi or further afield in Kenya.
            </p>

            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              A term&rsquo;s costs can exceed a month&rsquo;s income, and those costs come round
              again every year.
            </p>

            <p className="mt-8">
              <Link
                to="/mission"
                className="rounded font-body text-lg font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
              >
                Read our objectives and mission
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      {/* ── What sponsorship covers ───────────────────────────────────── */}
      <Section className="bg-sand-light">
        <Container>
          <H2>What your sponsorship covers</H2>
          <Lead>
            Both stages are funded the same way. Only the monthly figure changes, because secondary
            school costs more.
          </Lead>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card className="flex h-full flex-col">
              <h3 className="font-display text-2xl font-semibold text-primary">Primary school</h3>
              <p className="mt-2 font-body text-lg font-semibold text-ink">
                £15 a month · £180 a year
              </p>
              <ul className="mt-6 flex list-none flex-col gap-3 p-0">
                {COVERED.map(({ Icon, label }) => (
                  <li key={label} className="flex items-start gap-3 font-body text-base text-ink-soft">
                    <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-growth" />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-2 sm:mt-auto">
                <Button to="/sponsor?place=primary" className="min-h-[3.75rem] w-full text-center leading-snug">
                  Sponsor a primary school child
                </Button>
              </div>
            </Card>

            <Card className="flex h-full flex-col">
              <h3 className="font-display text-2xl font-semibold text-primary">Secondary school</h3>
              <p className="mt-2 font-body text-lg font-semibold text-ink">
                £35 a month · £420 a year
              </p>
              <ul className="mt-6 flex list-none flex-col gap-3 p-0">
                {COVERED.map(({ Icon, label }) => (
                  <li key={label} className="flex items-start gap-3 font-body text-base text-ink-soft">
                    <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-growth" />
                    {label}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-base leading-relaxed text-muted">
                Secondary school is where the Kenyan national exams decide what a young person can
                do next.
              </p>
              <div className="mt-8 pt-2 sm:mt-auto">
                <Button to="/sponsor?place=secondary" className="min-h-[3.75rem] w-full text-center leading-snug">
                  Sponsor a secondary school child
                </Button>
              </div>
            </Card>

            <Card className="flex h-full flex-col">
              <h3 className="font-display text-2xl font-semibold text-primary">
                Vocational and higher education
              </h3>
              <p className="mt-2 font-body text-lg font-semibold text-ink">Talk to us</p>
              <p className="mt-6 font-body text-base leading-relaxed text-ink-soft">
                Some of our students finish secondary school and want to carry on — into college,
                training or university. Costs vary with the course, so there is no fixed monthly
                figure. Tell us you are interested and we will explain what a particular student
                needs.
              </p>
              <div className="mt-8 pt-2 sm:mt-auto">
                <Button to="/contact" className="min-h-[3.75rem] w-full text-center leading-snug">
                  Ask about vocational and higher education
                </Button>
              </div>
            </Card>
          </div>

          <p className="mt-10 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
            We ask people to think in school years rather than months. When next year&rsquo;s fees
            are covered, the child, their family and the school can plan ahead.
          </p>
        </Container>
      </Section>

      {/* ── How it actually works ─────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <H2>How sponsorship starts</H2>
          <Lead>
            There is no card payment button on this website. Sponsorship here begins with a
            conversation, because sponsorship supports a child&rsquo;s schooling over several years.
          </Lead>

          <ol className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-divider bg-surface p-6 sm:p-8">
                <p
                  aria-hidden="true"
                  className="font-display text-3xl font-semibold leading-none text-accent-ink"
                >
                  {index + 1}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Button to="/contact">Ask about sponsoring a child</Button>
          </div>
        </Container>
      </Section>

      {/* ── What you receive ──────────────────────────────────────────── */}
      <Section className="bg-sand">
        <Container>
          <div className="max-w-prose">
            <H2>What comes back to you</H2>
            <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
              Letters and cards, in the child&rsquo;s own handwriting, passed on by us. If a
              child&rsquo;s circumstances change, you hear it from us rather than reading it later.
            </p>
            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              You can write to your child too. When one of our team visits Kenya from the UK, they
              take sponsors&rsquo; letters with them and hand them over in person.
            </p>
            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              We write to sponsors because the relationship goes both ways.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <H2>Hear from our existing sponsors</H2>
          <Lead>Four of our sponsors, in their own words.</Lead>

          <ul className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <li key={item.name}>
                <Card className="h-full">
                  <blockquote className="m-0">
                    <p className="font-display text-xl leading-snug text-ink">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer className="mt-5 font-body text-base font-semibold text-muted">
                      — {item.name}
                    </footer>
                  </blockquote>
                </Card>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-body text-base text-muted">
            Quoted as our sponsors wrote them, with children’s names removed.
          </p>

          <p className="mt-6">
            <Link
              to="/mission#testimonials"
              className="rounded font-body text-lg font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Read our testimonials
            </Link>
          </p>
        </Container>
      </Section>

      {/* ── Why we do this ────────────────────────────────────────────── */}
      <Section className="bg-sand-light">
        <Container>
          <div className="max-w-prose">
            <H2>Why we do this</H2>

            <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
              This is Christian work, and we would rather say so plainly than leave you to guess.
              The registered purposes under which it sits are to relieve need and advance the
              education of children in Kenya, and to advance the teaching of the Christian faith.
            </p>

            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              In practice we work through people who are already there. Rainbow House Kenya, whose
              project this is, knows the families in Gede, and knows when a child has stopped turning up at
              school.
            </p>

            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              Support is offered on the basis of need, whatever a family&rsquo;s faith. Sponsors
              come to us with every kind of belief and none, and all are equally welcome.
            </p>

            <p className="mt-8">
              <Link
                to="/about"
                className="rounded font-body text-lg font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sand-light"
              >
                More about who we are
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Gede today ────────────────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <H2>Gede today</H2>

              <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
                What used to be the Rainbow House children&rsquo;s home is now held in trust as
                ABBAFATHERLAND and runs as a community hub, with a library and an education resource
                centre. There are hydroponics, fruit cultivation and income-generating activities on
                the land.
              </p>

              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                The children we support live with their families or with foster parents. Our part is
                the cost of their schooling.
              </p>

              <div className="mt-8">
                <Button to="/gede" variant="ghost">
                  See the work in Gede
                </Button>
              </div>
            </div>

            <figure className="m-0">
              <img
                src={asset('/img/gede-01.jpg')}
                alt="A group of children in Gede."
                width="1200"
                height="1600"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-4xl object-cover shadow-card"
              />
              <figcaption className="mt-3 font-body text-sm text-muted">
                Photograph supplied by Rainbow House Kenya.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* ── The blog post ─────────────────────────────────────────────── */}
      <Section className="bg-sand">
        <Container>
          <H2>Latest from Gede</H2>

          <div className="mt-10 max-w-3xl">
            <Card>
              <p className="font-body text-sm font-semibold uppercase tracking-wider text-accent-ink">
                From the Team · 14 October 2026 · 6 min read
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-primary sm:text-3xl">
                What a children&rsquo;s home became
              </h3>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                In Gede, the building that was Rainbow House is now a library, a resource centre and
                a smallholding. The children live with families. Here is why that is progress and
                not retreat.
              </p>
              <div className="mt-8">
                <Button
                  to="/blog/gede-abbafatherland-what-a-childrens-home-became"
                  variant="ghost"
                >
                  Read the post
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ── Questions people ask ──────────────────────────────────────── */}
      <Section className="bg-paper">
        <Container>
          <H2>Before you get in touch</H2>

          <div className="mt-10 max-w-prose">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-divider py-2 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded py-4 font-display text-xl font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-body text-2xl leading-none text-accent-ink transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10">
            <Button to="/contact" variant="ghost">
              Ask us something else
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Closing ask ───────────────────────────────────────────────── */}
      <Section className="bg-sand-light">
        <Container>
          <div className="max-w-prose">
            <H2>Join our mission</H2>

            <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
              Your donations help us keep children in Gede, Watamu, in school. Every contribution,
              whatever the size, is welcome.
            </p>

            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              We welcome all conversations, support and donations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/sponsor">Sponsor a child</Button>
              <Button to="/contact" variant="ghost">
                Ask a question
              </Button>
            </div>

            <p className="mt-10 font-body text-base leading-relaxed text-muted">{PROJECT_OF}</p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

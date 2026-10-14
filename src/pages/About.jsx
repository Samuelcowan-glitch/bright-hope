import { Link } from 'react-router-dom'
import { BookOpen, HandCoins, Landmark, ShieldCheck } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button, Stat, Card } from '../components/ui.jsx'

/* What a sponsor’s money pays for. Taken from the charity’s own description
   of the sponsorship and nothing added to it. */
const COVERS = [
  'School fees',
  'Uniform and shoes',
  'Books and learning materials',
  'A daily meal at school',
  'Basic healthcare',
  'Exam entry',
]

/* The public register is linked rather than quoted, so that anyone can check
   the registration for themselves. Linking the search page rather than a
   deep link keeps the link alive if the register’s URLs change. */
const REGISTER_URL = 'https://register-of-charities.charitycommission.gov.uk/charity-search'

export default function About() {
  return (
    <Layout>
      <SEO
        title="About us | Funding education in Gede and Watamu, Kenya | Bright Hope Education Project"
        description="Who we are: a project of Rainbow House Kenya in Gede and Watamu, run by a small Christian group in Surrey, how the work is registered, and how the money is handled."
      />

      {/* Hero */}
      <Section className="bg-sand-light">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Eyebrow>About us</Eyebrow>
              <h1 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
                Who we are
              </h1>
              <Lead>
                A small Christian group in Surrey, the Rainbow House Kenya team who have been in Gede
                far longer than we have, and twenty-nine children whose school costs are paid each month by
                somebody in Britain.
              </Lead>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button to="/sponsor">Sponsor a child</Button>
                <Button to="/contact" variant="ghost">Ask us a question</Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src={asset('/img/gede-01.jpg')}
                alt="Children in matching blue t-shirts standing together under the corrugated roof of a community building in Gede, Kilifi County."
                className="h-64 w-full rounded-2xl object-cover shadow-card sm:h-80 lg:h-[26rem]"
                width="1200"
                height="1600"
                loading="eager"
              />
              <p className="mt-3 font-body text-sm text-muted">
                Photograph supplied by Rainbow House Kenya.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* What we do */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <H2>What we do</H2>
              <Lead>
                We fund access to education for children in Gede and Watamu, in Kilifi County on the
                Kenyan coast – children whose families cannot meet the cost of school.
              </Lead>
              <div className="mt-6 max-w-prose space-y-5 font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
                <p>
                  We do not build schools and we do not run them. We pay for children to attend the
                  schools that are already there, and we rely on the Rainbow House Kenya team in Gede to tell us
                  whether it is working.
                </p>
                <p>
                  Twenty-nine children are sponsored today. Sponsorship is £15 a month for a primary
                  school child and £35 a month for a secondary school student. Vocational and higher
                  education is sponsored by arrangement, because a trade course and a degree do not
                  cost the same thing.
                </p>
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                <Stat figure="29" label="Children sponsored, as at October 2026" />
                <Stat figure="£15" label="A month for a primary school child" />
                <Stat figure="£35" label="A month for a secondary school student" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src={asset('/img/sponsors-01.jpg')}
                alt="Four young children in checked maroon school uniform outside a home in Kilifi County, one of them holding an exercise book."
                className="h-72 w-full rounded-2xl object-cover shadow-card sm:h-96 lg:h-full lg:max-h-[32rem]"
                width="1546"
                height="1600"
                loading="lazy"
              />
              <p className="mt-3 font-body text-sm text-muted">
                Photograph supplied by Rainbow House Kenya.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* The legal position — stated carefully and at length */}
      <Section className="bg-sand">
        <Container>
          <div className="max-w-prose">
            <Eyebrow>How this work is registered</Eyebrow>
            <H2>A project of Rainbow House Kenya</H2>

            <Card className="mt-8 border-primary/25 bg-surface">
              <div className="flex gap-4">
                <Landmark aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <p className="font-body text-base font-semibold leading-relaxed text-ink sm:text-lg sm:leading-relaxed">
                  Bright Hope Education Project is a project of Rainbow House Kenya, a
                  charity registered in England and Wales, number 1111579.
                </p>
              </div>
            </Card>

            <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
              <p>
                That sentence is worth reading slowly, because it is the one most charity websites
                blur. The registration number 1111579 belongs to Rainbow House Kenya. It is their
                entry on the register, and it is not a number we use about ourselves.
              </p>
              <p>
                Rainbow House Kenya is the reason there is any work in Gede at all. They hold the
                ABBAFATHERLAND property in trust, they run the community hub, the library and the
                education resource centre on it, and they employ the local people who know the
                families and the schools. Bright Hope Education Project is their education
                sponsorship project, run from Britain: we find sponsors, we handle the money that comes
                from them, and we pass on what comes back.
              </p>
              <p>
                Within Rainbow House Kenya the work divides simply. Bright Hope funds the school
                costs; the team in Gede tell us what is actually needed, and which child is next.
                That is also why our Instagram and Facebook are Rainbow House Kenya&rsquo;s accounts.
              </p>
              <p>
                You can check the registration yourself. Search the Charity Commission register for
                number 1111579 and you will find Rainbow House Kenya.
              </p>
            </div>

            <div className="mt-8">
              <Button
                href={REGISTER_URL}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check 1111579 on the Charity Commission register
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Money */}
      <Section>
        <Container>
          <div className="max-w-prose">
            <Eyebrow>Money</Eyebrow>
            <H2>How the money works</H2>
            <Lead>
              All funding for the children goes directly for the children. 100% of a sponsor’s gift
              reaches the child it was given for.
            </Lead>

            <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
              <p>
                <strong className="font-semibold text-ink">
                  Here is why that figure can be 100 and not 92.
                </strong>{' '}
                There is no card payment button on this website, so there is no payment processor
                taking a percentage, no fundraising platform fee and no advertising spend between
                your bank and a school in Kilifi County. A sponsorship is a standing order set up by
                the sponsor, from the sponsor’s own bank, after we have written to you with the
                details. Nothing is deducted from it on the way through.
              </p>
              <p>
                It also means the gift is restricted to the purpose it was given for. If a
                sponsorship ends part-way through a year, or a child moves school, the money already
                given stays with children’s school costs in Gede and Watamu. It is not swept into
                anything else.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <Card>
                <HandCoins aria-hidden="true" className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">
                  What sponsorship pays for
                </h3>
                <ul className="mt-4 space-y-2.5 font-body text-base text-ink-soft">
                  {COVERS.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <BookOpen aria-hidden="true" className="h-6 w-6 text-growth" />
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">
                  What comes back to you
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
                  Letters and cards from the child you sponsor, passed on through us. We will also
                  tell you when something changes – a move of school, the end of a school year,
                  a family circumstance. We would rather you heard difficult news from us than not
                  at all.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Faith */}
      <Section className="bg-sand-light">
        <Container>
          <div className="max-w-prose">
            <Eyebrow>Why we are there</Eyebrow>
            <H2>Our faith, stated once and plainly</H2>
            <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
              <p>
                This is Christian work, and we would rather say so plainly than leave you to
                guess. The registered purposes it is pursued under are to relieve need and advance
                the education of children in Kenya, and to advance the teaching of the Christian
                faith. Both are on the register, and we would rather you read them here than find
                them later.
              </p>
              <p>
                It matters to say what that does and does not mean for your money. A sponsor’s gift
                pays a child’s school costs – fees, uniform and shoes, books and materials, a daily
                meal, basic healthcare and exam entry. No part of it is spent on the second purpose.
                That is how the 100% figure on this page and the second registered object sit
                together without contradicting each other.
              </p>
              <p>
                Support is offered on the basis of need, whatever a family believes. Nobody is asked
                to attend, join or profess anything in order to go to school, or in order to pay for
                somebody else to. Sponsors come to us with every kind of belief and none, and are
                equally welcome.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Safeguarding */}
      <Section>
        <Container>
          <div className="max-w-prose">
            <Eyebrow>Safeguarding</Eyebrow>
            <H2>Children, photographs and what we publish</H2>
            <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
              <p>
                The children we fund are children, and they live with their families or with foster
                parents in their own community. Their circumstances are not our marketing.
              </p>
              <ul className="space-y-3">
                {[
                  'We never publish a photograph of a child alongside their name, and we do not publish a child’s school or address.',
                  'Photographs of a sponsored child go privately to that child’s sponsor, and nowhere else.',
                  'Letters and cards pass through us in both directions. There is no direct contact between a sponsor and a child outside the charity.',
                  'Please do not send money or gifts to a child or family directly. It puts them in a difficult position and we cannot account for it.',
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-growth" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p>
                It is why the photographs on this site are mostly places, desks, books, growing beds
                and hands at work. That is deliberate, and it is not going to change.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Where we are */}
      <Section className="bg-sand">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Where to find us</Eyebrow>
              <H2>Where we are</H2>
              <address className="mt-6 max-w-prose font-body text-base not-italic leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
                <span className="block font-semibold text-ink">Bright Hope Education Project</span>
                <span className="mt-2 block text-sm uppercase tracking-wide text-muted">
                  Registered address
                </span>
                Priors Glade, Priorswood, Compton, Guildford, Surrey, GU3 1DR
                <br />
                <a
                  href="tel:+447551909493"
                  className="mt-2 inline-block rounded font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                >
                  07551909493
                </a>
              </address>
              <p className="mt-6 max-w-prose font-body text-base leading-relaxed text-ink-soft">
                We are a small team, so give us a couple of days to come back to you. How we handle
                the details you send us is set out in our{' '}
                <Link
                  to="/privacy-policy"
                  className="rounded font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
              <Button to="/contact">Contact us</Button>
              <Button to="/gede" variant="ghost">See the work in Gede</Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button, Stat, Card } from '../components/ui.jsx'

/* /gede — the place, ABBAFATHERLAND, the library, the growing, Rainbow House Kenya,
   and how the schools work with us. Every factual claim here is taken from
   the approved copy; nothing about an education coordinator, nothing about
   an allocation policy, and the registration is attributed to Rainbow House
   Kenya throughout. */

export default function Gede() {
  return (
    <Layout>
      <SEO
        title="Gede and Watamu, Kilifi County | Where we work | Bright Hope Education Project"
        description="Gede and Watamu in Kilifi County, Kenya: the schools, the families, the ABBAFATHERLAND community hub and library, and Rainbow House Kenya, whose project we are."
      />

      {/* Hero */}
      <Section className="bg-sand-light">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Eyebrow>Where we work</Eyebrow>
              <h1 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
                Gede and Watamu, Kilifi County
              </h1>
              <Lead>
                Two places on the Kenyan coast, forty minutes inland and ten minutes from the sea.
                Ruins, farmland, small schools, large families, and a lot of children who could be
                in a classroom.
              </Lead>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to="/sponsor">Sponsor a child</Button>
                <Button to="/contact" variant="ghost">
                  Ask about sponsoring a child
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <figure className="overflow-hidden rounded-2xl border border-divider bg-surface shadow-card">
                <img
                  src={asset('/img/gede-01.jpg')}
                  alt="Children in matching blue T-shirts standing together under the corrugated roof of a community building in Gede."
                  className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
                  width="1200"
                  height="900"
                  loading="eager"
                />
                <figcaption className="px-5 py-4 font-body text-sm leading-relaxed text-muted">
                  Photograph supplied by the charity, Gede, Kilifi County.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </Section>

      {/* The place */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>The place</Eyebrow>
              <H2>Coastal money, a few miles away</H2>
            </div>
            <div className="lg:col-span-7">
              <div className="max-w-prose space-y-5 font-body text-lg leading-relaxed text-ink-soft">
                <p>
                  Gede sits inland of Watamu in Kilifi County, in eastern Kenya. There is tourism
                  money on the coast and very little of it a few miles in. Families work land, fish,
                  trade, and manage. What they struggle to manage is the cost of keeping a child in
                  school year after year: fees, uniform, shoes, books, exam entry, the bus.
                </p>
                <p>
                  Watamu is where some of our students go to secondary school, which is why travel
                  costs appear in the £35 a month package. Distance is not a detail here. It is the
                  difference between sitting an exam and not sitting it.
                </p>
              </div>

              <dl className="mt-10 grid gap-8 sm:grid-cols-3">
                <div>
                  <dt className="sr-only">Children sponsored</dt>
                  <dd>
                    <Stat figure="29" label="Children sponsored, as at October 2026" />
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Proportion of a gift that reaches the child</dt>
                  <dd>
                    <Stat figure="100%" label="Of a gift reaches the child it is given for" />
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Monthly cost of primary sponsorship</dt>
                  <dd>
                    <Stat figure="£15" label="A month for primary school — £35 for secondary" />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ABBAFATHERLAND */}
      <Section className="bg-sand">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Eyebrow>ABBAFATHERLAND</Eyebrow>
              <H2>A children&rsquo;s home that became a community hub</H2>
              <div className="mt-6 max-w-prose space-y-5 font-body text-lg leading-relaxed text-ink-soft">
                <p>
                  What began as the Rainbow House children&rsquo;s home is now held in trust as
                  ABBAFATHERLAND. The property runs as a community hub in Gede, with a library and
                  an education resource centre. There are hydroponics on the site, fruit
                  cultivation, and income-generating activities intended to carry the costs of the
                  place rather than leaving it dependent on donations from abroad.
                </p>
                <p>
                  The children who were once in the home now live with their families or with foster
                  parents. That was a deliberate change and the right one. A child belongs in a
                  family. What they need from us is the school fees.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <figure className="overflow-hidden rounded-2xl border border-divider bg-surface shadow-card">
                <img
                  src={asset('/img/gede-02.jpg')}
                  alt="A group of children waving and laughing through a gap in an old coral-brick wall."
                  className="h-64 w-full object-cover sm:h-80 lg:h-[24rem]"
                  width="1200"
                  height="800"
                  loading="lazy"
                />
                <figcaption className="px-5 py-4 font-body text-sm leading-relaxed text-muted">
                  Photograph supplied by the charity.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </Section>

      {/* Library and growing */}
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Card>
              <Eyebrow>The library and resource centre</Eyebrow>
              <h3 className="font-display text-2xl font-semibold leading-snug text-primary sm:text-3xl">
                Where the homework gets done
              </h3>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                A library in a village where most households own no books is not a nice extra. It is
                where homework gets done, where a secondary student can revise somewhere quiet, and
                where a child who has fallen behind can be helped by someone with the patience to do
                it.
              </p>
            </Card>

            <Card className="border-growth/25">
              <Eyebrow>Hydroponics and growing</Eyebrow>
              <h3 className="font-display text-2xl font-semibold leading-snug text-growth sm:text-3xl">
                Food, a small income, and a skill
              </h3>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Hydroponic growing channels and fruit cultivation on the ABBAFATHERLAND land produce
                food and a small income. It is practical, it is local, and it teaches something:
                several of the young people around the site have learned to run it.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Rainbow House Kenya */}
      <Section className="bg-sand-light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>Whose project we are</Eyebrow>
              <H2>Rainbow House Kenya</H2>
            </div>
            <div className="lg:col-span-7">
              <div className="max-w-prose space-y-5 font-body text-lg leading-relaxed text-ink-soft">
                <p className="font-semibold text-ink">
                  Bright Hope Education Project is a project of Rainbow House Kenya.
                </p>
                <p>
                  Rainbow House Kenya are the reason there is any work in Gede at all. Communities in Gede
                  and Watamu are at the heart of the work. By collaborating with local leaders and
                  employing local staff, we aim to keep the programmes community-led and reaching
                  those who need them most.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* How the schools work with us */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>How the schools work with us</Eyebrow>
              <H2>Home visits, and the schools themselves</H2>
            </div>
            <div className="lg:col-span-7">
              <div className="max-w-prose space-y-5 font-body text-lg leading-relaxed text-ink-soft">
                <p>
                  Through home visits and close collaboration with local schools, we aim to empower
                  children by creating opportunities for learning, support, and a sense of
                  belonging.
                </p>
                <p>
                  Sponsorship covers the costs the schools set, and nothing a family is left to find
                  on its own:
                </p>
              </div>
              <ul className="mt-6 grid max-w-prose gap-x-8 gap-y-3 font-body text-lg leading-relaxed text-ink-soft sm:grid-cols-2">
                {[
                  'School fees',
                  'Uniform and shoes',
                  'Books and materials',
                  'A daily meal',
                  'Basic healthcare',
                  'Exam entry',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Closing band */}
      <Section className="bg-growth">
        <Container>
          <div className="max-w-prose">
            <h2 className="font-display text-display-sm font-semibold text-paper sm:text-display">
              Twenty-nine children in Gede have a sponsor
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-paper/90 sm:text-xl sm:leading-relaxed">
              There are others in Gede and Watamu whose families cannot meet school costs. If you
              would like to sponsor one of them, we will tell you who is waiting and why.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                to="/sponsor"
                variant="ghost"
                className="border-paper/70 bg-paper text-growth hover:border-paper hover:bg-sand focus-visible:ring-paper focus-visible:ring-offset-growth"
              >
                Sponsor a child
              </Button>
              <Button
                to="/blog"
                variant="ghost"
                className="border-paper/60 text-paper hover:border-paper hover:bg-paper/10 focus-visible:ring-paper focus-visible:ring-offset-growth"
              >
                Read the latest post
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

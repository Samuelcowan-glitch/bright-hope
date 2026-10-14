import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button, Card } from '../components/ui.jsx'

/* /mission — mission and vision, both registered objects stated plainly,
   education, community, sustainability, the future, and the four sponsor
   quotes. The quotes are reproduced as the sponsors wrote them, with
   children's names removed for safeguarding and no rating graphics, and
   the registration is attributed to Rainbow House Kenya. */

const OBJECTS = [
  {
    number: '1',
    text: 'To relieve need and advance the education of children in Kenya.',
    note: 'This is what a sponsor pays for.',
  },
  {
    number: '2',
    text: 'To advance the teaching of the Christian faith.',
    note: 'This is who we are, and why we are in Gede rather than somewhere a plane ride more convenient.',
  },
]

const PILLARS = [
  {
    eyebrow: 'Education',
    heading: 'Access, in one place, done properly',
    body:
      'Our purpose is to expand access to education in Gede, Kilifi. Through home visits and close collaboration with local schools, we aim to support children’s learning and their sense of belonging. Our hope is that more young people are able to go on to higher education if they choose to.',
  },
  {
    eyebrow: 'Community',
    heading: 'Led by the people who live there',
    body:
      'The community in Gede is at the heart of our work. By collaborating with local leaders and employing local staff, we aim for our programmes to be community-led and to reach the children who need them most.',
  },
  {
    eyebrow: 'Sustainability',
    heading: 'Resilience that outlasts the sponsorship',
    body:
      'We hope to support long-term resilience in Kilifi County. Through steady sponsorship and community-led support, we help children stay in school, where their teachers build confidence, safety, skills and knowledge in the next generation of young people in their own communities.',
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
      'Thank you so much for telling me about [name] & his family, I don’t know how to say thank you enough for all that you do',
  },
  {
    name: 'Lynda',
    quote: 'I received [name]’s Card and letter, it was beautiful, Thank you',
  },
]

export default function Mission() {
  return (
    <Layout>
      <SEO
        title="Our mission, vision and goals | Bright Hope Education"
        description="Our mission in Gede, Watamu, Kilifi County: education, community and sustainability, the registered objects this work is pursued under, and what our sponsors say."
      />

      {/* Hero */}
      <Section className="bg-sand-light">
        <Container>
          <div className="max-w-prose">
            <Eyebrow>Objectives and mission</Eyebrow>
            <h1 className="font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
              Our Mission, Vision and Goals
            </h1>
            <Lead>
              Bright Hope Education is a project of Rainbow House Kenya. What follows is what we are trying to
              do in Gede, Watamu, and the purposes we are registered to pursue.
            </Lead>
          </div>
        </Container>
      </Section>

      {/* Mission and vision */}
      <Section>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Eyebrow>Mission and vision</Eyebrow>
              <H2>Every child in a classroom, whatever their circumstance</H2>
              <div className="mt-6 max-w-prose space-y-5 font-body text-lg leading-relaxed text-ink-soft">
                <p>
                  Starting in Gede, Watamu, in eastern Kenya, our vision is to provide an
                  environment where every child has access to education, regardless of their
                  background or circumstance.
                </p>
                <p>
                  Education is what families here are trying hardest to afford. By helping with
                  school costs, we aim to help young people stay in school and gain the learning and
                  the qualifications to make their own choices as adults.
                </p>
                <p>
                  We work in partnership with local communities, schools and families to strengthen
                  learning outcomes and support positive, lasting change.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="overflow-hidden rounded-2xl border border-divider bg-surface shadow-card">
                <img
                  src={asset('/img/sponsors-01.jpg')}
                  alt="Four young children in Kilifi County, one of them holding an exercise book."
                  className="h-72 w-full object-cover sm:h-96"
                  width="1200"
                  height="1300"
                  loading="lazy"
                />
                <figcaption className="px-5 py-4 font-body text-sm leading-relaxed text-muted">
                  Photograph supplied by the charity, Kilifi County, Kenya.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </Section>

      {/* Registered objects */}
      <Section className="bg-sand">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>The registered objects</Eyebrow>
              <H2>The registered purposes this work is pursued under</H2>
              <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
                Area of benefit: Kenya. Both objects are on the register, and we would rather state
                them than leave you to guess. The registration is held by Rainbow House Kenya, whose
                project this is.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ol className="space-y-6">
                {OBJECTS.map((object) => (
                  <li key={object.number}>
                    <Card>
                      <div className="flex gap-5">
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-growth font-display text-xl font-semibold text-paper"
                        >
                          {object.number}
                        </span>
                        <div>
                          <p className="font-display text-xl font-semibold leading-snug text-primary sm:text-2xl">
                            {object.text}
                          </p>
                          <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                            {object.note}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
                Support for a child is never conditional on what their family believes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Education, community, sustainability */}
      <Section>
        <Container>
          <Eyebrow>What we are working towards</Eyebrow>
          <H2>Education, community, sustainability</H2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {PILLARS.map((pillar) => (
              <Card key={pillar.eyebrow} className="flex flex-col">
                <Eyebrow>{pillar.eyebrow}</Eyebrow>
                <h3 className="font-display text-2xl font-semibold leading-snug text-primary">
                  {pillar.heading}
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* The future */}
      <Section className="bg-sand-light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>The future</Eyebrow>
              <H2>What we want next is countable</H2>
            </div>
            <div className="lg:col-span-7">
              <div className="max-w-prose space-y-5 font-body text-lg leading-relaxed text-ink-soft">
                <p>
                  More than forty-four students sponsored. More students finishing secondary school
                  and going on to vocational training or university. A library in Gede that is busy
                  every afternoon.
                </p>
                <p>
                  Long-term sponsorship is particularly valuable because it means a child&rsquo;s
                  school costs can be covered right through their education, not just for a year.
                </p>
                <p>We welcome all conversations, support and donations.</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to="/sponsor">Sponsor a child</Button>
                <Button to="/contact" variant="ghost">
                  Ask about sponsoring a child
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials">
        <Container>
          <Eyebrow>Our testimonials</Eyebrow>
          <H2>Four of our sponsors, in their own words</H2>
          <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
            Quoted as our sponsors wrote them, with children&rsquo;s names removed.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <blockquote className="font-body text-lg leading-relaxed text-ink-soft">
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
                <p className="mt-5 font-body text-base font-semibold text-primary">
                  {testimonial.name}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing band */}
      <Section className="bg-primary">
        <Container>
          <div className="max-w-prose">
            <h2 className="font-display text-display-sm font-semibold text-paper sm:text-display">
              Join us in our mission
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-paper/90 sm:text-xl sm:leading-relaxed">
              £15 a month covers a primary school child&rsquo;s school costs, and £35 a month covers a
              secondary school student&rsquo;s. Vocational and higher education sponsorship is arranged with us directly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                to="/sponsor"
                variant="ghost"
                className="border-paper/70 bg-paper text-primary hover:border-paper hover:bg-sand-light focus-visible:ring-paper focus-visible:ring-offset-primary"
              >
                Sponsor a child
              </Button>
              <Button
                to="/gede"
                variant="ghost"
                className="border-paper/60 text-paper hover:border-paper hover:bg-paper/10 focus-visible:ring-paper focus-visible:ring-offset-primary"
              >
                See the work in Gede
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

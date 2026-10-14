import { Link } from 'react-router-dom'
import { CalendarDays, Clock, ArrowRight } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button, Card } from '../components/ui.jsx'
import posts from '../data/posts.js'

/* The archive holds one post. The listing is therefore built as a single
   wide feature rather than a grid, because a three-column grid with one
   card in it looks like a mistake — and because promising "regular
   updates" with one post in the archive would not be true. */

export default function Blog() {
  const [featured, ...rest] = posts

  return (
    <Layout>
      <SEO
        title="Blog | Updates from Gede, Watamu, Kenya | Bright Hope Education"
        description="Updates from Gede, Watamu, Kilifi County: the schools, the library, the ABBAFATHERLAND hub and what sponsorship paid for this term."
      />

      {/* Header */}
      <Section className="bg-sand-light pb-10 sm:pb-12 lg:pb-14">
        <Container>
          <Eyebrow>Gede, Watamu · Kilifi County · Kenya</Eyebrow>
          <h1 className="max-w-prose font-display text-display font-semibold text-primary sm:text-display-lg lg:text-display-xl">
            Read our latest updates
          </h1>
          <Lead>
            Updates on our day-to-day work, our education projects and news from Gede, Watamu,
            Kilifi County, Kenya.
          </Lead>
        </Container>
      </Section>

      {/* The archive */}
      <Section className="pt-12 sm:pt-14 lg:pt-16">
        <Container>
          {featured ? (
            <>
              <article className="overflow-hidden rounded-2xl border border-divider bg-surface shadow-card">
                <div className="grid lg:grid-cols-2">
                  <img
                    src={asset(featured.image)}
                    alt={featured.imageAlt}
                    className="h-56 w-full object-cover sm:h-72 lg:h-full lg:min-h-[22rem]"
                    loading="lazy"
                  />
                  <div className="p-6 sm:p-8 lg:p-10">
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm text-muted">
                      <span>{featured.byline}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 text-accent-ink" aria-hidden="true" />
                        <time dateTime={featured.date}>{featured.dateLabel}</time>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-accent-ink" aria-hidden="true" />
                        {featured.readTime}
                      </span>
                    </p>

                    <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl">
                      <Link
                        to={`/blog/${featured.slug}`}
                        className="rounded-sm hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        {featured.title}
                      </Link>
                    </h2>

                    <p className="mt-4 max-w-prose font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                      {featured.standfirst}
                    </p>

                    <Button to={`/blog/${featured.slug}`} className="mt-7">
                      Read the post
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>

              {rest.length > 0 && (
                <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <Card className="h-full">
                        <p className="font-body text-sm text-muted">
                          {post.byline} ·{' '}
                          <time dateTime={post.date}>{post.dateLabel}</time>
                        </p>
                        <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-primary">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="rounded-sm hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                          {post.standfirst}
                        </p>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="mt-5 inline-flex items-center gap-2 font-body text-base font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                        >
                          Read the post
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Card>
              <p className="font-body text-lg leading-relaxed text-ink-soft">
                New posts are written at the end of each school term. Follow us on TikTok in the
                meantime.
              </p>
            </Card>
          )}
        </Container>
      </Section>

      {/* When we write */}
      <Section className="bg-sand">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <H2>When we write</H2>
              <Lead>
                We write when something has actually happened — a term ending, the national exams,
                a new student, a change at the hub. If you would like it by email, say so when you
                get in touch.
              </Lead>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/sponsor">Sponsor a child</Button>
              <Button to="/contact" variant="ghost">
                Ask us something
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

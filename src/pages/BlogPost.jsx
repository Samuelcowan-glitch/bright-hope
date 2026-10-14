import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button } from '../components/ui.jsx'
import posts from '../data/posts.js'

/* Reads the post out of src/data/posts.js by slug. An unknown slug renders
   a real page with a route back to the archive rather than a blank screen,
   because the build is static and there is no server to send a 404. */

const BACK_LINK =
  'inline-flex items-center gap-2 rounded-sm font-body text-base font-semibold text-primary ' +
  'hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <Layout>
        <SEO
          title="Post not found | Bright Hope Education"
          description="We could not find that blog post. The archive lists everything we have written."
        />
        <Section>
          <Container>
            <Eyebrow>Blog</Eyebrow>
            <h1 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display">
              We could not find that post
            </h1>
            <Lead>
              The address may have changed, or the link may have been mistyped. Everything we have
              written is listed on the blog.
            </Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/blog">Go to the blog</Button>
              <Button to="/contact" variant="ghost">
                Tell us about the broken link
              </Button>
            </div>
          </Container>
        </Section>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title={post.metaTitle} description={post.metaDescription} />

      <article>
        {/* Header */}
        <Section className="bg-sand-light pb-10 sm:pb-12 lg:pb-14">
          <Container>
            <div className="max-w-prose">
              <Link to="/blog" className={BACK_LINK}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to the blog
              </Link>

              <h1 className="mt-6 font-display text-display font-semibold text-primary sm:text-display-lg">
                {post.title}
              </h1>

              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">
                {post.standfirst}
              </p>

              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm text-muted">
                <span>{post.byline}</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-accent-ink" aria-hidden="true" />
                  <time dateTime={post.date}>{post.dateLabel}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent-ink" aria-hidden="true" />
                  {post.readTime}
                </span>
              </p>
            </div>
          </Container>
        </Section>

        {/* Body */}
        <Section className="pt-12 sm:pt-14 lg:pt-16">
          <Container>
            <figure className="max-w-prose">
              <img
                src={asset(post.image)}
                alt={post.imageAlt}
                className="w-full rounded-2xl border border-divider object-cover shadow-card"
              />
              <figcaption className="mt-3 font-body text-sm leading-relaxed text-muted">
                Gede, Kilifi County. Photograph supplied by Rainbow House Kenya.
              </figcaption>
            </figure>

            <div className="mt-10 max-w-prose">
              {post.body.map((block) =>
                block.startsWith('## ') ? (
                  <h2
                    key={block}
                    className="mt-12 font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl"
                  >
                    {block.slice(3)}
                  </h2>
                ) : (
                  <p
                    key={block}
                    className="mt-6 font-body text-lg leading-relaxed text-ink-soft first:mt-0"
                  >
                    {block}
                  </p>
                ),
              )}
            </div>

            <div className="mt-12 max-w-prose border-t border-divider pt-8">
              <div className="flex flex-wrap gap-3">
                <Button to="/sponsor">Sponsor a child</Button>
                <Button to="/blog" variant="ghost">
                  Back to the blog
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </article>

      {/* Closing ask */}
      <Section className="bg-sand">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <H2>Forty-four students are sponsored through Bright Hope today.</H2>
              <Lead>
                £15 a month covers a primary school child’s school costs. £35 a month covers a
                secondary school student’s. Vocational and higher education is arranged student by student, so tell us
                what interests you and we will write back.
              </Lead>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/sponsor">Sponsor a child</Button>
              <Button to="/contact" variant="ghost">
                Ask about sponsoring a child
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

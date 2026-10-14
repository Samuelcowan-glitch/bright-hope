import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, MapPinned } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import asset from '../lib/asset.js'
import { Section, Container, Eyebrow, H2, Lead, Button, Card } from '../components/ui.jsx'

const NEXT_STEPS = [
  'We reply and ask anything we need to know.',
  'We tell you about a child or student who does not yet have a sponsor – their stage of school, and what the year costs.',
  'If you are happy to go ahead, we send you the details to set up a standing order from your own bank. £15 a month for primary, £35 for secondary, or an agreed amount for vocational and higher education.',
  'Letters and cards start coming back to you during the school year.',
]

export default function ThankYou() {
  /* The confirmation page is not something anyone should arrive at from a
     search result, so it asks not to be indexed. The tag is removed again on
     the way out, because the rest of the site very much does want indexing. */
  useEffect(() => {
    const tag = document.createElement('meta')
    tag.setAttribute('name', 'robots')
    tag.setAttribute('content', 'noindex')
    document.head.appendChild(tag)
    return () => {
      document.head.removeChild(tag)
    }
  }, [])

  return (
    <Layout>
      <SEO
        title="Thank you | Bright Hope Education"
        description="Your message has reached us. We will reply shortly."
      />

      <Section className="bg-sand-light">
        <Container>
          <Eyebrow>Message received</Eyebrow>
          <h1 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
            Thank you – your message has reached us
          </h1>
          <Lead>
            Someone will reply, usually within two or three days. We are a small team in Surrey, not
            a call centre, so it is a person reading it.
          </Lead>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <H2>If you asked about sponsoring a child</H2>
              <p className="mt-5 max-w-prose font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
                Here is what happens next.
              </p>
              <ol className="mt-8 space-y-6">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-growth font-display text-base font-semibold text-paper"
                    >
                      {index + 1}
                    </span>
                    <p className="max-w-prose font-body text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-10 max-w-prose rounded-2xl border border-divider bg-sand-light p-6 font-body text-base leading-relaxed text-ink">
                If you do not hear from us within a week, please{' '}
                <Link
                  to="/contact"
                  className="rounded font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sand-light"
                >
                  send us a message again
                </Link>
                . It will mean the message went astray, not that we were not interested.
              </p>
            </div>

            {/* Meanwhile */}
            <aside className="lg:col-span-5">
              <Card>
                <h2 className="font-display text-2xl font-semibold text-primary">Meanwhile</h2>
                <ul className="mt-6 space-y-6">
                  <li className="flex gap-3">
                    <MapPinned aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-growth" />
                    <div>
                      <Button to="/gede" variant="ghost" className="px-5 py-2.5 text-[0.95rem]">
                        Read about Gede and ABBAFATHERLAND
                      </Button>
                      <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                        The community hub, the library and the hydroponics on the land
                        Rainbow House Kenya holds in trust.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <BookOpen aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-growth" />
                    <div>
                      <Button to="/blog" variant="ghost" className="px-5 py-2.5 text-[0.95rem]">
                        Read the blog
                      </Button>
                      <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                        What a children’s home became, and why the children now live with families.
                      </p>
                    </div>
                  </li>
                </ul>

                <img
                  src={asset('/img/gede-02.jpg')}
                  alt="Children in Gede waving, hands raised."
                  className="mt-8 h-48 w-full rounded-xl object-cover"
                  width="612"
                  height="408"
                  loading="lazy"
                />
                <p className="mt-3 font-body text-sm text-muted">
                  Gede, Kilifi County. Photograph supplied by Rainbow House Kenya.
                </p>

                <p className="mt-6 font-body text-sm leading-relaxed text-muted">
                  Bright Hope Education is a project of Rainbow House Kenya.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

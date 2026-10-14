import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import { Section, Container, Eyebrow, Lead, Button } from '../components/ui.jsx'

/* The site is a static build with no server, so there is nothing to send a
   real 404 status. What this page can do is be honest about what happened
   and put the three things people were probably looking for in front of
   them. */

export default function NotFound() {
  return (
    <Layout>
      <SEO
        title="Page not found | Bright Hope Education"
        description="We could not find that page. Here are the pages people usually want: sponsoring a child, our work in Gede, and how to get in touch."
      />

      <Section>
        <Container>
          <div className="max-w-prose">
            <Eyebrow>Page not found</Eyebrow>
            <h1 className="font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
              We could not find that page
            </h1>
            <Lead>
              The address may have changed, or the link may have been mistyped. Nothing has gone
              wrong with your message or your sponsorship.
            </Lead>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/">Go to the home page</Button>
              <Button to="/sponsor" variant="ghost">
                Sponsor a child
              </Button>
              <Button to="/contact" variant="ghost">
                Tell us about the broken link
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

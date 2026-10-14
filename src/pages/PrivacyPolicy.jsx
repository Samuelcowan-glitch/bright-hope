import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import { Section, Container, Eyebrow, Lead, Button, Card } from '../components/ui.jsx'

/* Written for the site as it actually is: a static build with no login, no
   shop, no comments, no embedded third-party content and no analytics. The
   old WordPress policy described all of those; none of them is true now. */

const LINK =
  'rounded-sm font-semibold text-primary underline decoration-primary/40 underline-offset-2 ' +
  'hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper'

const HEADING = 'font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl'
const BODY = 'mt-4 font-body text-lg leading-relaxed text-ink-soft'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEO
        title="Privacy policy | Bright Hope Education"
        description="How Bright Hope Education handles the personal information you send us through this website."
      />

      {/* Header */}
      <Section className="bg-sand-light pb-10 sm:pb-12 lg:pb-14">
        <Container>
          <div className="max-w-prose">
            <Eyebrow>Last updated 14 October 2026</Eyebrow>
            <h1 className="font-display text-display font-semibold text-primary sm:text-display-lg">
              Privacy policy
            </h1>
            <Lead>
              This policy explains what happens to the information you give us through this website.
              The site is a set of static pages: it has no login, no shop, no comments and no
              database of visitors.
            </Lead>
          </div>
        </Container>
      </Section>

      {/* The policy */}
      <Section className="pt-12 sm:pt-14 lg:pt-16">
        <Container>
          <div className="max-w-prose">
            <section aria-labelledby="controller">
              <h2 id="controller" className={HEADING}>
                Who is responsible for your information
              </h2>
              <p className={BODY}>
                The data controller for enquiries sent through this website is Bright Hope Education,
                Priors Glade, Priorswood, Compton, Guildford, Surrey, GU3 1DR, telephone
                07551909493. If you would rather write to a person than to an organisation, ask for
                the trustee responsible for data protection and your message will be passed on.
              </p>
              <p className={BODY}>
                Bright Hope Education is a project of Rainbow House Kenya.
              </p>
            </section>

            <section aria-labelledby="collect" className="mt-12">
              <h2 id="collect" className={HEADING}>
                What the enquiry form collects
              </h2>
              <p className={BODY}>
                Only what you type into it: your name, your email address, your telephone number if
                you choose to give it, the reason for your message, the sponsorship type you
                selected, and the message itself. We also record that you ticked the consent box,
                and when.
              </p>
              <p className={BODY}>
                The form on the contact page and the one at the foot of the sponsorship page are the
                same form: they collect the same things and reach the same inbox. There is no other
                form on this site. We do not ask for bank details, card details or a date of birth
                anywhere, and we never will by email.
              </p>
            </section>

            <section aria-labelledby="why" className="mt-12">
              <h2 id="why" className={HEADING}>
                Why we collect it
              </h2>
              <p className={BODY}>
                To reply to you, and to arrange a child&rsquo;s sponsorship if that is what you have
                asked about. Nothing else. We do not add you to a mailing list you did not ask for,
                and we do not use your details for advertising of any kind.
              </p>
              <p className={BODY}>
                Our lawful basis is your consent, given when you tick the box on the form. You can
                withdraw it at any time by telling us, and we will stop writing to you.
              </p>
            </section>

            <section aria-labelledby="where" className="mt-12">
              <h2 id="where" className={HEADING}>
                Where it goes
              </h2>
              <p className={BODY}>
                The form is handled by a third-party form provider, which passes your message
                straight to our email inbox. That provider processes your message on our
                instructions and for no purpose of its own. Your details are then held in that
                inbox and, if you become a sponsor, in our sponsor records.
              </p>
              <p className={BODY}>
                Our trustees and the small number of people who administer sponsorship can see
                enquiries. Where it is necessary to arrange a particular child&rsquo;s sponsorship,
                we share what is needed with Rainbow House Kenya, whose project this is. We do not sell, rent
                or trade your details to anybody.
              </p>
            </section>

            <section aria-labelledby="keep" className="mt-12">
              <h2 id="keep" className={HEADING}>
                How long we keep it
              </h2>
              <p className={BODY}>
                Enquiries that do not lead to sponsorship are deleted within twelve months. Sponsor
                records are kept for as long as you sponsor a child and for six years afterwards,
                which is what charity accounting rules require of us.
              </p>
            </section>

            <section aria-labelledby="cookies" className="mt-12">
              <h2 id="cookies" className={HEADING}>
                Cookies and tracking
              </h2>
              <p className={BODY}>
                This website sets no advertising cookies and no tracking cookies, and we run no
                analytics on it. Nothing you do on these pages is recorded or profiled. There are no
                embedded social feeds, comment systems or advertising scripts. If we ever add basic,
                anonymous visitor statistics, we will say so here before we switch them on.
              </p>
              <p className={BODY}>
                One thing is worth naming. The typefaces these pages are set in are served by Google
                Fonts, so loading a page sends your IP address to Google in order to fetch them. No
                cookie is set by it and we receive nothing from it, but it is a request to a third
                party and you should know it happens. It is the only one on the site.
              </p>
            </section>

            <section aria-labelledby="children" className="mt-12">
              <h2 id="children" className={HEADING}>
                Children&rsquo;s information
              </h2>
              <p className={BODY}>
                We do not collect information from children through this website. Information about
                the children we support is held securely and is not published. We do not publish a
                photograph of an identifiable child alongside a name, and no child&rsquo;s home
                location appears on this site. Sponsors receive letters and cards from the child
                they sponsor privately, through us.
              </p>
            </section>

            <section aria-labelledby="rights" className="mt-12">
              <h2 id="rights" className={HEADING}>
                Your rights
              </h2>
              <p className={BODY}>
                Under UK data protection law you can ask us for a copy of what we hold about you,
                ask us to correct it if it is wrong, ask us to delete it, ask us to restrict what we
                do with it, object to our using it, and ask for it in a portable form. You can also
                withdraw your consent to being contacted. Write to the address above or ring us, and
                we will deal with it within one month.
              </p>
              <p className={BODY}>
                If you are not satisfied with how we have handled your information, you can complain
                to the Information Commissioner&rsquo;s Office at{' '}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  className={LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ico.org.uk
                </a>{' '}
                or on 0303 123 1113. We would rather you came to us first, but you do not have to.
              </p>
            </section>

            <section aria-labelledby="changes" className="mt-12">
              <h2 id="changes" className={HEADING}>
                Changes to this policy
              </h2>
              <p className={BODY}>
                If this policy changes, the date at the top of the page changes with it. This
                version was published on 14 October 2026.
              </p>
            </section>

            <Card className="mt-12">
              <h2 className="font-display text-xl font-semibold leading-snug text-primary">
                Contact us about your information
              </h2>
              <ul className="mt-4 flex flex-col gap-3 font-body text-base leading-relaxed text-ink-soft">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                  <span>
                    Bright Hope Education, Priors Glade, Priorswood, Compton, Guildford,
                    Surrey, GU3 1DR
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                  <a href="tel:+447551909493" className={LINK}>
                    07551909493
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/contact">Send us a message</Button>
                <Button to="/about" variant="ghost">
                  About us
                </Button>
              </div>
            </Card>

            <p className="mt-10 font-body text-sm leading-relaxed text-muted">
              Photography: the photographs of Gede, Watamu on this site were supplied by
              Rainbow House Kenya. No stock or generated image is captioned as a real
              place, and no child is named beside a photograph.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              Bright Hope Education is a project of Rainbow House Kenya. You can read more on our{' '}
              <Link to="/about" className={LINK}>
                about page
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

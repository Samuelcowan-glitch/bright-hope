import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock, MapPin, Phone } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import { Section, Container, Eyebrow, H2, Lead, Card } from '../components/ui.jsx'

/* ──────────────────────────────────────────────────────────────────────────
   THE FORM ENDPOINT — the one line the office needs to change. It is the same
   value as the form at the foot of /sponsor, so both forms land in the same
   inbox. The site is a static build with no server of its own, so the enquiry
   posts straight to a third-party form service. Create the form at
   formspree.io, copy the endpoint it gives you ("https://formspree.io/f/" plus
   your form id) and paste it below.

   Until it is replaced the form still validates; the post simply reaches a
   form id that does not exist, which is why the failure message beneath the
   button tells people how to reach us instead.
   ────────────────────────────────────────────────────────────────────────── */
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_FORM_ID'

/* The reply-to address used by the "email us directly" fallback. The domain is
   the charity's own; CONFIRM THE MAILBOX NAME WITH THE OFFICE before launch
   and correct it here if it is anything other than info@. */
const CONTACT_EMAIL = 'info@brighthopeeducation.com'
const CONTACT_PHONE = '07551909493'

const REASONS = [
  'Sponsor a child',
  'General question about your organisation',
  'My church, school or company would like to help',
  'Other',
]

const SPONSORSHIP_TYPES = [
  'Sponsor a primary school child (£15 a month)',
  'Sponsor a secondary school child (£35 a month)',
  'Sponsor a child in vocational or higher education',
  'Other',
]

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  reason: '',
  sponsorshipType: '',
  message: '',
  consent: false,
}

const fieldClass =
  'mt-2 w-full rounded-xl border border-divider bg-surface px-4 py-3 font-body text-base text-ink ' +
  'placeholder:text-muted-light focus:border-primary focus:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper'

const labelClass = 'block font-body text-base font-semibold text-ink'
const helperClass = 'mt-1 font-body text-sm text-muted'

function validate(values) {
  const errors = {}
  if (!values.firstName.trim() || !values.lastName.trim()) {
    errors.name = 'Please tell us your first name and your last name.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'We need a working email address to reply to you.'
  }
  if (!values.reason) {
    errors.reason = 'Please choose a reason, so your message reaches the right person.'
  }
  if (!values.message.trim()) {
    errors.message = 'Please add a line or two about what you would like to ask.'
  }
  if (!values.consent) {
    errors.consent = 'Please tick the box so we know we may reply to you.'
  }
  return errors
}

export default function Contact() {
  const navigate = useNavigate()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)

  const update = (field) => (event) => {
    const value = field === 'consent' ? event.target.checked : event.target.value
    setValues((current) => ({ ...current, [field]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSendFailed(false)

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSending(true)
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Enquiry — brighthopeeducation.com',
          'Enquiry page': '/contact',
          name: `${values.firstName} ${values.lastName}`.trim(),
          email: values.email.trim(),
          telephone: values.telephone.trim(),
          reason: values.reason,
          sponsorshipType: values.reason === 'Sponsor a child' ? values.sponsorshipType : '',
          message: values.message.trim(),
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
        title="Contact us | Bright Hope Education Project"
        description="In order to sponsor a child, or to ask anything about our work in Gede and Watamu, Kenya, send us a message. We reply to every enquiry."
      />

      <Section className="bg-sand-light pb-10 sm:pb-12 lg:pb-16">
        <Container>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
            Contact
          </h1>
          <Lead>
            In order to sponsor a child please reach out to us below. Whether you want to sponsor a
            child, ask how the money is spent, or talk about your church or school supporting a
            student, this form reaches the office and we read all of it.
          </Lead>
        </Container>
      </Section>

      <Section className="pt-10 sm:pt-12 lg:pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* The form */}
            <div className="lg:col-span-7">
              <H2>Contact us</H2>

              <form onSubmit={onSubmit} noValidate className="mt-8 space-y-7">
                <fieldset className="space-y-4 border-0 p-0">
                  <legend className={labelClass}>Your Name</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="font-body text-sm text-muted">
                        First
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={values.firstName}
                        onChange={update('firstName')}
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="font-body text-sm text-muted">
                        Last
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={values.lastName}
                        onChange={update('lastName')}
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  {errors.name && (
                    <p id="name-error" role="alert" className="font-body text-sm font-semibold text-primary">
                      {errors.name}
                    </p>
                  )}
                </fieldset>

                <div>
                  <label htmlFor="email" className={labelClass}>Your Email</label>
                  <p className={helperClass}>So we can reply</p>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update('email')}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-2 font-body text-sm font-semibold text-primary">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="telephone" className={labelClass}>Telephone (optional)</label>
                  <p className={helperClass}>Only if you would rather we rang</p>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    value={values.telephone}
                    onChange={update('telephone')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="reason" className={labelClass}>The reason for your email</label>
                  <select
                    id="reason"
                    name="reason"
                    value={values.reason}
                    onChange={update('reason')}
                    aria-invalid={errors.reason ? 'true' : undefined}
                    aria-describedby={errors.reason ? 'reason-error' : undefined}
                    className={fieldClass}
                  >
                    <option value="">Please choose</option>
                    {REASONS.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                  {errors.reason && (
                    <p id="reason-error" role="alert" className="mt-2 font-body text-sm font-semibold text-primary">
                      {errors.reason}
                    </p>
                  )}
                </div>

                {values.reason === 'Sponsor a child' && (
                  <div>
                    <label htmlFor="sponsorshipType" className={labelClass}>Sponsorship type</label>
                    <select
                      id="sponsorshipType"
                      name="sponsorshipType"
                      value={values.sponsorshipType}
                      onChange={update('sponsorshipType')}
                      className={fieldClass}
                    >
                      <option value="">Please choose</option>
                      {SPONSORSHIP_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us about the child sponsorship you’re interested in"
                    value={values.message}
                    onChange={update('message')}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={fieldClass}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-2 font-body text-sm font-semibold text-primary">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      onChange={update('consent')}
                      aria-invalid={errors.consent ? 'true' : undefined}
                      aria-describedby={errors.consent ? 'consent-error' : 'consent-note'}
                      className="mt-1 h-5 w-5 shrink-0 rounded border-divider text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    />
                    <label htmlFor="consent" className="font-body text-base leading-relaxed text-ink-soft">
                      I consent to be contacted to begin a dialogue to sponsor a child for
                      educational purposes.
                    </label>
                  </div>
                  <p id="consent-note" className="mt-3 font-body text-sm leading-relaxed text-muted">
                    We use your details only to reply to you. We do not sell or share them. Read our{' '}
                    <Link
                      to="/privacy-policy"
                      className="rounded font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>
                  {errors.consent && (
                    <p id="consent-error" role="alert" className="mt-2 font-body text-sm font-semibold text-primary">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {sendFailed && (
                  <p
                    role="alert"
                    className="rounded-xl border border-primary/30 bg-primary/5 p-4 font-body text-base leading-relaxed text-ink"
                  >
                    Something went wrong at our end. Please email us at{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {CONTACT_EMAIL}
                    </a>{' '}
                    or ring{' '}
                    <a
                      href={`tel:+44${CONTACT_PHONE.slice(1)}`}
                      className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {CONTACT_PHONE}
                    </a>{' '}
                    instead – your message has not been lost, but it has not reached us either.
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-body text-base font-semibold leading-none text-paper transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-70"
                  >
                    {sending ? 'Sending…' : 'Send Message'}
                  </button>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                    If the form will not send,{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="rounded font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      email us directly
                    </a>{' '}
                    and we will pick it up.
                  </p>
                </div>
              </form>
            </div>

            {/* Alongside the form */}
            <aside className="lg:col-span-5">
              <Card className="bg-sand-light">
                <h2 className="font-display text-2xl font-semibold text-primary">
                  Prefer to speak to someone?
                </h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-3">
                    <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <a
                      href="tel:+447551909493"
                      className="rounded font-body text-lg font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sand-light"
                    >
                      07551909493
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <address className="font-body text-base not-italic leading-relaxed text-ink-soft">
                      <span className="block text-sm uppercase tracking-wide text-muted">
                        Registered address
                      </span>
                      Priors Glade, Priorswood, Compton, Guildford, Surrey, GU3 1DR
                    </address>
                  </li>
                  <li className="flex gap-3">
                    <Clock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="font-body text-base leading-relaxed text-ink-soft">
                      We are a small team, so give us a couple of days.
                    </p>
                  </li>
                </ul>
              </Card>

              <Card className="mt-6">
                <h2 className="font-display text-2xl font-semibold text-primary">
                  What happens after you send it
                </h2>
                <ol className="mt-5 space-y-4 font-body text-base leading-relaxed text-ink-soft">
                  {[
                    'Your message goes to the office inbox and a person reads it. Usually you will hear back within two or three days.',
                    'If you asked about sponsoring a child, we write back about a child or student who is waiting, their stage of school and what the year costs.',
                    'If you are happy to go ahead, we send you the details to set up a standing order from your own bank – £15 a month for primary, £35 for secondary, or an agreed amount for vocational and higher education.',
                    'Letters and cards begin coming back to you during the school year, passed on through us.',
                  ].map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-base font-semibold text-paper"
                      >
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 font-body text-base leading-relaxed text-ink-soft">
                  Bright Hope Education Project works in partnership with Rainbow House Kenya, a
                  charity registered in England and Wales, number 1111579.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

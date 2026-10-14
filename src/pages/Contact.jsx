import { useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CircleAlert, MapPin, MessageSquare, Phone } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import SEO from '../components/SEO.jsx'
import { Section, Container, Eyebrow, Lead, Card } from '../components/ui.jsx'

/* ──────────────────────────────────────────────────────────────────────────
   THE FORM ENDPOINT — the one line the office needs to change. It is the same
   value as the form at the foot of /sponsor, so both forms land in the same
   inbox. The site is a static build with no server of its own, so the enquiry
   posts straight to a third-party form service. Create the form at
   formspree.io, copy the endpoint it gives you ("https://formspree.io/f/" plus
   your form id) and paste it below.

   Until it is replaced, FORM_READY is false and the form does not try to post
   at all: once the details are checked, pressing send opens the visitor's own
   email app with the whole message already filled in, and the page keeps a
   copy of the message on screen with the phone number, so no enquiry is lost.
   As soon as a real form id is pasted in, the form posts to Formspree and
   lands on /thank-you, and nothing else needs changing.
   ────────────────────────────────────────────────────────────────────────── */
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_FORM_ID'
const FORM_READY =
  /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(FORM_ENDPOINT) && !FORM_ENDPOINT.includes('REPLACE')

/* The reply-to address used by the "email us" fallbacks. The domain is
   the charity's own; CONFIRM THE MAILBOX NAME WITH THE OFFICE before launch
   and correct it here if it is anything other than info@. */
const CONTACT_EMAIL = 'info@brighthopeeducation.com'
const CONTACT_PHONE = '07551909493'
const PHONE_DISPLAY = `${CONTACT_PHONE.slice(0, 5)} ${CONTACT_PHONE.slice(5)}`
const PHONE_HREF = `tel:+44${CONTACT_PHONE.slice(1)}`

/* `key` is what a link into this page can preselect, e.g. /contact?reason=sponsor.
   `label` is what the visitor sees and what the office receives. */
const REASONS = [
  { key: 'sponsor', label: 'Sponsoring a child' },
  { key: 'general', label: 'A general question about the project' },
  { key: 'group', label: 'My church, school or company would like to help' },
  { key: 'other', label: 'Something else' },
]
const SPONSOR = 'sponsor'

const SPONSORSHIP_STAGES = [
  'Primary school – £15 a month',
  'Secondary school – £35 a month',
  'Vocational or higher education – amount agreed with you',
  'Not sure yet',
]

const MESSAGE_HINTS = {
  sponsor: 'For example, which stage of school you are thinking of, or any questions you have.',
  group: 'Tell us a little about your group and what you have in mind.',
}
const DEFAULT_MESSAGE_HINT = 'A line or two is plenty.'

/* The order the fields appear in, so the error summary and the focus after a
   failed send both follow the page from top to bottom. */
const FIELD_ORDER = ['reason', 'name', 'email', 'message', 'consent']
const FIELD_TARGET = {
  reason: 'reason-sponsor',
  name: 'name',
  email: 'email',
  message: 'message',
  consent: 'consent',
}

const fieldBase =
  'mt-2 w-full rounded-xl border bg-surface px-4 py-3 font-body text-base text-ink ' +
  'focus:border-primary focus:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper'
const fieldClass = (invalid) =>
  `${fieldBase} ${invalid ? 'border-accent-ink ring-1 ring-accent-ink' : 'border-muted-light'}`

const labelClass = 'block font-body text-base font-semibold text-ink'
const legendClass = 'font-body text-base font-semibold text-ink'
const helperClass = 'mt-1 font-body text-sm text-muted'
const linkClass =
  'rounded font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-paper'
const radioClass =
  'mt-0.5 h-5 w-5 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper'

const describedBy = (...ids) => ids.filter(Boolean).join(' ') || undefined

function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-2 flex gap-2 font-body text-sm font-semibold text-accent-ink">
      <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {children}
      </span>
    </p>
  )
}

function reasonLabel(key) {
  return REASONS.find((reason) => reason.key === key)?.label ?? ''
}

function validateField(field, values) {
  switch (field) {
    case 'reason':
      return values.reason ? '' : 'Choose what you would like to talk to us about.'
    case 'name':
      return values.name.trim() ? '' : 'Enter your name.'
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
        ? ''
        : 'Enter an email address in the correct format, like name@example.com.'
    case 'message':
      return values.message.trim() ? '' : 'Add a line or two about what you would like to ask.'
    case 'consent':
      return values.consent ? '' : 'Tick the box so we can reply to you.'
    default:
      return ''
  }
}

function validate(values) {
  const errors = {}
  for (const field of FIELD_ORDER) {
    const message = validateField(field, values)
    if (message) errors[field] = message
  }
  return errors
}

/* The same enquiry as plain text, for the email hand-off and the copy box. */
function messageText(values) {
  return [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    values.telephone.trim() ? `Telephone: ${values.telephone.trim()}` : null,
    `About: ${reasonLabel(values.reason)}`,
    values.reason === SPONSOR && values.sponsorshipStage
      ? `Stage of school: ${values.sponsorshipStage}`
      : null,
    '',
    values.message.trim(),
  ]
    .filter((line) => line !== null)
    .join('\n')
}

function buildMailto(values) {
  const subject = `Enquiry: ${reasonLabel(values.reason) || 'a message from the website'}`
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    messageText(values),
  )}`
}

export default function Contact() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselected = REASONS.some((reason) => reason.key === searchParams.get('reason'))
    ? searchParams.get('reason')
    : ''

  const [values, setValues] = useState(() => ({
    reason: preselected,
    sponsorshipStage: '',
    name: '',
    email: '',
    telephone: '',
    message: '',
    consent: false,
  }))
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const [handedToEmail, setHandedToEmail] = useState(false)
  const [copied, setCopied] = useState(false)
  const inFlight = useRef(false)
  const summaryRef = useRef(null)

  const update = (field) => (event) => {
    const value = field === 'consent' ? event.target.checked : event.target.value
    const next = { ...values, [field]: value }
    setValues(next)
    setCopied(false)
    // Clear an error as soon as it is fixed; new errors only appear on send.
    if (errors[field] && !validateField(field, next)) {
      setErrors((current) => {
        const rest = { ...current }
        delete rest[field]
        return rest
      })
    }
  }

  const focusField = (field) => (event) => {
    event.preventDefault()
    document.getElementById(FIELD_TARGET[field])?.focus()
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageText(values))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (inFlight.current) return
    setSendFailed(false)
    setHandedToEmail(false)

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Wait for the summary to render, then take the visitor to it.
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    // Honeypot: people never see this field, so anything in it is a bot.
    const trap = event.currentTarget.elements.namedItem('_gotcha')
    if (trap && trap.value) {
      navigate('/thank-you')
      return
    }

    if (!FORM_READY) {
      setHandedToEmail(true)
      window.location.href = buildMailto(values)
      return
    }

    inFlight.current = true
    setSending(true)
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(15000) : undefined,
        body: JSON.stringify({
          _subject: 'Enquiry — brighthopeeducation.com',
          _gotcha: '',
          'Enquiry page': '/contact',
          name: values.name.trim(),
          email: values.email.trim(),
          telephone: values.telephone.trim() || undefined,
          reason: reasonLabel(values.reason),
          sponsorshipType: values.reason === SPONSOR ? values.sponsorshipStage : '',
          message: values.message.trim(),
          consent: 'Agreed to be contacted about this enquiry',
          consentGivenAt: new Date().toISOString(),
        }),
      })
      if (!response.ok) throw new Error('The form provider rejected the message.')
      navigate('/thank-you')
    } catch {
      inFlight.current = false
      setSendFailed(true)
      setSending(false)
    }
  }

  const errorKeys = FIELD_ORDER.filter((field) => errors[field])
  const messageHint = MESSAGE_HINTS[values.reason] ?? DEFAULT_MESSAGE_HINT
  const showStages = values.reason === SPONSOR
  const buttonLabel = sending
    ? 'Sending your enquiry…'
    : !FORM_READY
      ? 'Send by email'
      : sendFailed
        ? 'Try again'
        : 'Send enquiry'

  return (
    <Layout>
      <SEO
        title="Contact us | Bright Hope Education"
        description="Sponsor a child, or ask anything about our work in Gede, Watamu, Kenya. Send us a message or ring the office. We reply to every enquiry."
      />

      <Section className="bg-sand-light pt-10 pb-8 sm:pt-16 sm:pb-12 lg:pt-28 lg:pb-16">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="max-w-prose font-display text-display-sm font-semibold text-primary sm:text-display lg:text-display-lg">
            Get in touch
          </h1>
          <Lead>
            Whether you would like to sponsor a child, ask how the money is spent, or talk about your
            church, school or company supporting a student, send us a message. It goes to the office,
            and a person reads and replies to every one.
          </Lead>
          <p className="mt-4 font-body text-base text-ink-soft lg:hidden">
            Prefer to ring?{' '}
            <a href={PHONE_HREF} className={linkClass}>
              {PHONE_DISPLAY}
            </a>
          </p>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-12 lg:pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* The form */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl font-semibold text-primary">Send us a message</h2>
              <p className={`${helperClass} mt-2`}>All fields are needed unless marked optional.</p>

              <form
                onSubmit={onSubmit}
                noValidate
                aria-busy={sending || undefined}
                className="relative mt-6 space-y-7"
              >
                {errorKeys.length > 0 && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="group"
                    aria-labelledby="error-summary-title"
                    className="rounded-xl border-2 border-accent-ink bg-surface p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    <h3
                      id="error-summary-title"
                      className="flex items-center gap-2 font-body text-lg font-semibold text-ink"
                    >
                      <CircleAlert aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-ink" />
                      There is a problem
                    </h3>
                    <ul className="mt-3 space-y-2 font-body text-base">
                      {errorKeys.map((field) => (
                        <li key={field}>
                          <a
                            href={`#${FIELD_TARGET[field]}`}
                            onClick={focusField(field)}
                            className="rounded font-semibold text-accent-ink underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            {errors[field]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What it is about — first, so the rest of the form can adapt to it */}
                <fieldset
                  className="border-0 p-0"
                  aria-describedby={describedBy(errors.reason && 'reason-error')}
                >
                  <legend className={legendClass}>What would you like to talk to us about?</legend>
                  <FieldError id="reason-error">{errors.reason}</FieldError>
                  <div className="mt-3 space-y-3">
                    {REASONS.map((reason) => (
                      <div key={reason.key}>
                        <label
                          htmlFor={`reason-${reason.key}`}
                          className="flex cursor-pointer gap-3 font-body text-base leading-snug text-ink-soft"
                        >
                          <input
                            id={`reason-${reason.key}`}
                            type="radio"
                            name="reason"
                            value={reason.key}
                            checked={values.reason === reason.key}
                            onChange={update('reason')}
                            className={radioClass}
                          />
                          <span>{reason.label}</span>
                        </label>

                        {reason.key === SPONSOR && showStages && (
                          <fieldset
                            id="sponsorship-stage"
                            className="ml-2.5 mt-3 border-0 border-l-4 border-solid border-divider py-1 pl-6"
                          >
                            <legend className="font-body text-base font-semibold text-ink">
                              Which stage of school are you thinking of? (optional)
                            </legend>
                            <div className="mt-3 space-y-3">
                              {SPONSORSHIP_STAGES.map((stage, index) => (
                                <label
                                  key={stage}
                                  htmlFor={`stage-${index}`}
                                  className="flex cursor-pointer gap-3 font-body text-base leading-snug text-ink-soft"
                                >
                                  <input
                                    id={`stage-${index}`}
                                    type="radio"
                                    name="sponsorshipStage"
                                    value={stage}
                                    checked={values.sponsorshipStage === stage}
                                    onChange={update('sponsorshipStage')}
                                    className={radioClass}
                                  />
                                  <span>{stage}</span>
                                </label>
                              ))}
                            </div>
                          </fieldset>
                        )}
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="name" className={labelClass}>Full name</label>
                  <FieldError id="name-error">{errors.name}</FieldError>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    spellCheck={false}
                    aria-required="true"
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={describedBy(errors.name && 'name-error')}
                    className={fieldClass(errors.name)}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Email address</label>
                  <p id="email-hint" className={helperClass}>So we can reply</p>
                  <FieldError id="email-error">{errors.email}</FieldError>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    aria-required="true"
                    value={values.email}
                    onChange={update('email')}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={describedBy('email-hint', errors.email && 'email-error')}
                    className={fieldClass(errors.email)}
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className={labelClass}>Telephone (optional)</label>
                  <p id="tel-hint" className={helperClass}>Only if you would rather we rang</p>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    value={values.telephone}
                    onChange={update('telephone')}
                    aria-describedby="tel-hint"
                    className={fieldClass(false)}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Your message</label>
                  <p id="message-hint" className={helperClass}>{messageHint}</p>
                  <FieldError id="message-error">{errors.message}</FieldError>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    aria-required="true"
                    value={values.message}
                    onChange={update('message')}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={describedBy('message-hint', errors.message && 'message-error')}
                    className={fieldClass(errors.message)}
                  />
                </div>

                {/* Honeypot for spam bots. Hidden from people and from screen readers. */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="_gotcha">Leave this empty</label>
                  <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <FieldError id="consent-error">{errors.consent}</FieldError>
                  <div className="flex gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      aria-required="true"
                      checked={values.consent}
                      onChange={update('consent')}
                      aria-invalid={errors.consent ? 'true' : undefined}
                      aria-describedby={describedBy('consent-note', errors.consent && 'consent-error')}
                      className="mt-1 h-5 w-5 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    />
                    <label htmlFor="consent" className="cursor-pointer font-body text-base leading-relaxed text-ink-soft">
                      I am happy for Bright Hope Education to contact me about this enquiry.
                    </label>
                  </div>
                  <p id="consent-note" className="mt-3 font-body text-sm leading-relaxed text-muted">
                    We use your details only to reply to you, and to arrange a sponsorship if that is
                    what you have asked about.{' '}
                    {FORM_READY
                      ? 'Your message is handled by a third-party form provider and reaches our email inbox.'
                      : 'Your message goes from your own email app to our inbox.'}{' '}
                    We do not sell or share your details. Read our{' '}
                    <Link to="/privacy-policy" className={linkClass}>
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>

                {sendFailed && (
                  <div
                    role="alert"
                    className="rounded-xl border border-accent-ink/40 bg-accent/10 p-4 font-body text-base leading-relaxed text-ink"
                  >
                    <p>
                      Sorry, your message did not send. What you wrote is still in the form above, so
                      nothing is lost. You can try again, ring us on{' '}
                      <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>, or{' '}
                      <a href={buildMailto(values)} className={linkClass}>
                        email it to us at {CONTACT_EMAIL}
                      </a>{' '}
                      (the link opens your email app with your message already filled in).
                    </p>
                  </div>
                )}

                {handedToEmail && (
                  <div
                    role="status"
                    className="rounded-xl border border-divider bg-sand-light p-5 font-body text-base leading-relaxed text-ink"
                  >
                    <p>
                      Your email app should now have opened with your message ready to go. Please press
                      send there. If nothing opened, ring us on{' '}
                      <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a> or email us at{' '}
                      <a href={buildMailto(values)} className={linkClass}>{CONTACT_EMAIL}</a>. You
                      can copy your message from the box below, so you do not have to type it again.
                    </p>
                    <label htmlFor="message-copy" className="mt-4 block font-semibold text-ink">
                      A copy of your message
                    </label>
                    <textarea
                      id="message-copy"
                      readOnly
                      rows={8}
                      value={messageText(values)}
                      onFocus={(event) => event.target.select()}
                      className={fieldClass(false)}
                    />
                    <button
                      type="button"
                      onClick={copyMessage}
                      className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-primary/35 bg-transparent px-5 py-3 font-body text-base font-semibold leading-none text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      {copied ? 'Copied' : 'Copy my message'}
                    </button>
                    <span className="sr-only" aria-live="polite">
                      {copied ? 'Your message has been copied.' : ''}
                    </span>
                  </div>
                )}

                <div>
                  <p className="mb-4 font-body text-base leading-relaxed text-ink-soft">
                    Sending a message does not commit you to anything.
                  </p>
                  <button
                    type="submit"
                    aria-disabled={sending || undefined}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-body text-base font-semibold leading-none text-ink transition-colors duration-200 hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper aria-disabled:cursor-wait aria-disabled:opacity-70 sm:w-auto"
                  >
                    {buttonLabel}
                  </button>
                  <p className="sr-only" role="status" aria-live="polite">
                    {sending ? 'Sending your enquiry…' : ''}
                  </p>
                  {!FORM_READY && (
                    <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                      Pressing send opens your email app with your message filled in, ready to go to{' '}
                      {CONTACT_EMAIL}. Or ring us on{' '}
                      <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>.
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Alongside the form */}
            <aside className="space-y-6 lg:col-span-5">
              <Card className="bg-sand-light">
                <h2 className="font-display text-2xl font-semibold text-primary">
                  Prefer to speak to someone?
                </h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-3">
                    <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <a
                      href={PHONE_HREF}
                      className="rounded font-body text-lg font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sand-light"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <address className="font-body text-base not-italic leading-relaxed text-ink-soft">
                      <span className="mb-1 block font-body text-eyebrow font-semibold uppercase text-growth">
                        Registered address
                      </span>
                      Priors Glade, Priorswood, Compton, Guildford, Surrey, GU3 1DR
                      <span className="mt-1 block text-muted">You are welcome to write to us here.</span>
                    </address>
                  </li>
                  <li className="flex gap-3">
                    <MessageSquare aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="font-body text-base leading-relaxed text-ink-soft">
                      We are a small team, and a person reads every message.
                    </p>
                  </li>
                </ul>
              </Card>

              <Card>
                <h2 className="font-display text-2xl font-semibold text-primary">
                  If you are asking about sponsorship
                </h2>
                <ol className="mt-5 space-y-4 font-body text-base leading-relaxed text-ink-soft">
                  {[
                    'A person in the office reads your message and replies, asking anything we need to know.',
                    'We tell you about a child or student who does not yet have a sponsor – their stage of school, and what the year costs.',
                    'If you are happy, we send you the details to set up a standing order from your own bank.',
                    'Letters and cards start coming back during the school year.',
                  ].map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-growth font-display text-base font-semibold text-paper"
                      >
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 font-body text-base">
                  <Link to="/sponsor" className={linkClass}>
                    Read more about how sponsorship works
                  </Link>
                </p>
              </Card>

              <Card>
                <h2 className="font-display text-2xl font-semibold text-primary">
                  Who you are sending it to
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
                  Bright Hope Education is a project of Rainbow House Kenya.
                </p>
                <p className="mt-4 font-body text-base leading-relaxed text-muted">
                  If something about your enquiry is not handled as it should be, tell us: ring{' '}
                  {PHONE_DISPLAY} or write to the registered address above, and it goes to the
                  trustees.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

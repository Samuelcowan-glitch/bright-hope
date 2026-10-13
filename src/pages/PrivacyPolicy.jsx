import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">&larr; Back</Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Privacy</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-muted">
        <p>
          Bright Hope Education Project is a charity registered in England and
          Wales, number 1111579. This page explains what we do with the details
          you give us.
        </p>
        <p>
          <strong className="text-ink">What we collect.</strong> Only what you
          type into the contact form: your name, email address, and anything
          else you choose to tell us.
        </p>
        <p>
          <strong className="text-ink">What we use it for.</strong> To reply to
          you and, if you go on to sponsor a child, to administer that
          sponsorship. We do not sell or share it.
        </p>
        <p>
          <strong className="text-ink">How long we keep it.</strong> For as long
          as you are in touch with us, and no longer than we need it.
        </p>
        <p>
          <strong className="text-ink">Your rights.</strong> You can ask us what
          we hold, ask us to correct it, or ask us to delete it. Write to us and
          we will do it.
        </p>
        <p className="text-sm italic">
          This page still needs the charity's contact address and a data
          controller name before the site goes live.
        </p>
      </div>
    </main>
  )
}

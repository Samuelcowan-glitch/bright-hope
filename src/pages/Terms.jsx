import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-primary-dark">&larr; Back</Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Terms</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-muted">
        <p>
          This website is published by Bright Hope Education Project, a charity
          registered in England and Wales, number 1111579.
        </p>
        <p>
          <strong className="text-ink">Sponsorship.</strong> Sponsorship is a
          voluntary monthly gift. It is not a contract with a child or a school,
          and it can be stopped at any time by cancelling your standing order
          and letting us know.
        </p>
        <p>
          <strong className="text-ink">How gifts are used.</strong> Money given
          for a named child is spent on that child's schooling. Where a child
          leaves the programme, we will contact you before redirecting your gift.
        </p>
        <p>
          <strong className="text-ink">Photographs.</strong> Images on this site
          are used with permission. Please do not reproduce them elsewhere.
        </p>
        <p className="text-sm italic">
          This page still needs review by the trustees before the site goes live.
        </p>
      </div>
    </main>
  )
}

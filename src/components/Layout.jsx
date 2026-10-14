import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-body text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-body focus:text-base focus:font-semibold focus:text-paper"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Every link and menu item lands at the top of the page it opens, including
   a click on the page you are already on. A link with a #section still goes
   to that section instead. */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return null
}

import { useEffect } from 'react'

/* No dependency and no helmet. The site is a static build with client-side
   routing, so the title and description are set on mount per page; the
   crawlable defaults live in index.html. */

export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])

  return null
}

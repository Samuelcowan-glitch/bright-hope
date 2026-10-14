/* Public-folder assets.
 *
 * The site is served from the root on the live domain and from a sub-path on
 * the github.io address it is checked on, so an absolute "/img/…" would 404
 * there. This prefixes the build's base once, in one place, and leaves every
 * call site reading as /img/<name>.
 *
 * It lives in its own module rather than in components/ui.jsx so that the
 * kit file exports nothing but components.
 */
export default function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`
}

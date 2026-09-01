import type { Page, Post } from '../payload-types'

// Canonical on-site path with a trailing slash. Prefers the nested `fullPath`
// (matches the legacy URL structure) over the flat `slug`; home → `/`.
export function getPagePath(doc: Partial<Page> | Partial<Post> | null | undefined): string {
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  if (!slug || slug === 'home') return '/'

  const raw = (doc as Partial<Page>)?.fullPath || `/${slug}`
  const withLead = raw.startsWith('/') ? raw : `/${raw}`
  return withLead.endsWith('/') ? withLead : `${withLead}/`
}

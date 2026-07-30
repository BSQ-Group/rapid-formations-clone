/**
 * Shape of a Payload `link()` field as it appears in block props (depth=1).
 * Optional `label`/`url` accommodate both label-required and label-disabled link configs.
 */
export type LinkData = {
  type?: ('reference' | 'custom') | null
  url?: string | null
  newTab?: boolean | null
  label?: string | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: { slug: string; fullPath?: string | null } | string
  } | null
}

/**
 * Resolve a Payload link field to a concrete href. Returns `#` when no link is provided.
 *
 * For page references, prefer `fullPath` (the breadcrumb-aware URL set by Pages' beforeChange
 * hook — e.g. `/services/registered-office-address`) and fall back to `/${slug}` only when
 * the page hasn't computed one yet. Without this, internal CTAs to nested pages 404.
 */
export function getLinkHref(link?: LinkData | null): string {
  if (!link) return '#'
  if (link.type === 'reference' && typeof link.reference?.value === 'object') {
    const { slug, fullPath } = link.reference.value
    if (link.reference.relationTo === 'posts') return `/posts/${slug}`
    return fullPath || `/${slug}`
  }
  return link.url || '#'
}

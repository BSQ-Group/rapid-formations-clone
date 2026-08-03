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

export function getLinkHref(link?: LinkData | null): string {
  if (!link) return '#'
  if (link.type === 'reference' && typeof link.reference?.value === 'object') {
    const { slug, fullPath } = link.reference.value
    if (link.reference.relationTo === 'posts') return `/posts/${slug}`
    return fullPath || `/${slug}`
  }
  return link.url || '#'
}

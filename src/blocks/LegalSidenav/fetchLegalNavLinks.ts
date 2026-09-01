import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Page } from '@/payload-types'

export type LegalNavLink = {
  slug: string
  label: string
}

function linkFromPage(page: Page): LegalNavLink | null {
  const slug = page.slug
  const label = page.navigationLabel || page.title || slug
  if (!slug || !label) return null
  return { slug, label }
}

// Derived from published legal pages, sorted by title — replaces the removed
// `legalSidenav` global (so no more manual ordering / per-item hide).
export async function fetchLegalNavLinks(): Promise<LegalNavLink[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [{ isLegalPage: { equals: true } }, { _status: { equals: 'published' } }],
    },
    select: { slug: true, title: true, navigationLabel: true },
    sort: 'title',
    limit: 100,
    overrideAccess: true,
  })

  return result.docs
    .map((page) => linkFromPage(page as Page))
    .filter((link): link is LegalNavLink => link !== null)
}

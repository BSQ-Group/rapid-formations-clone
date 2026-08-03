import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Page } from '@/payload-types'

export type LegalNavLink = {
  slug: string
  label: string
}

function isPublishedPage(value: unknown): value is Page {
  if (typeof value !== 'object' || value === null) return false
  const page = value as Page
  if (typeof page.slug !== 'string') return false
  return !page._status || page._status === 'published'
}

function linkFromPage(page: Page, labelOverride?: string | null): LegalNavLink | null {
  const slug = page.slug
  const label = labelOverride || page.navigationLabel || page.title || slug
  if (!slug || !label) return null
  return { slug, label }
}

export async function fetchLegalNavLinks(): Promise<LegalNavLink[]> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload
    .findGlobal({ slug: 'legalSidenav', depth: 1, overrideAccess: true })
    .catch(() => null)

  const items = global?.items ?? []

  if (items.length === 0) {
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

  return items
    .filter((item) => !item.hidden)
    .map((item) => (isPublishedPage(item.page) ? linkFromPage(item.page) : null))
    .filter((link): link is LegalNavLink => link !== null)
}
